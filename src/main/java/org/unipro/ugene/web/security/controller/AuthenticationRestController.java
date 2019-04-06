package org.unipro.ugene.web.security.controller;

import org.unipro.ugene.web.model.UserSettings;
import org.unipro.ugene.web.security.*;
import org.unipro.ugene.web.security.service.JwtAuthenticationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import org.unipro.ugene.web.security.service.JwtUserDetailsService;
import org.unipro.ugene.web.service.UserSettingsService;

import javax.servlet.http.HttpServletRequest;
import java.util.Objects;


@RestController
public class AuthenticationRestController {

    @Value("${jwt.header}")
    private String tokenHeader;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    @Qualifier("jwtUserDetailsService")
    private JwtUserDetailsService userDetailsService;

    @Autowired
    @Qualifier("userSettingsService")
    private UserSettingsService userSettingsService;

    @RequestMapping(value = "${jwt.route.authentication.path}", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtAuthenticationRequest authenticationRequest) throws AuthenticationException {

        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        // Reload password post-security so we can generate the token
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        final String token = jwtTokenUtil.generateToken(userDetails);

        // Return the token
        return ResponseEntity.ok(new JwtAuthenticationResponse(token));
    }

    @RequestMapping(value = "${jwt.route.authentication.refresh}", method = RequestMethod.GET)
    public ResponseEntity<?> refreshAndGetAuthenticationToken(HttpServletRequest request) {
        String authToken = request.getHeader(tokenHeader);
        final String token = authToken.substring(7);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        JwtUser user = (JwtUser) userDetailsService.loadUserByUsername(username);

        if (jwtTokenUtil.canTokenBeRefreshed(token, user.getLastPasswordResetDate())) {
            String refreshedToken = jwtTokenUtil.refreshToken(token);
            return ResponseEntity.ok(new JwtAuthenticationResponse(refreshedToken));
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @RequestMapping(value = "${jwt.route.authentication.profile.get}", method = RequestMethod.GET)
    public ResponseEntity<?> getProfile(HttpServletRequest request) {
        String token = request.getHeader(tokenHeader).substring(7);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        JwtUser user = (JwtUser) userDetailsService.loadUserByUsername(username);
        return ResponseEntity.ok(user);
    }

    @RequestMapping(value = "${jwt.route.authentication.profile.put}",
            method = RequestMethod.POST,
            consumes = "application/json")
    public ResponseEntity<?> updateProfile(HttpServletRequest httpServletRequest,
                                           @RequestBody JwtProfileRequest request) {
        String token0 = httpServletRequest.getHeader(tokenHeader).substring(7);

        // Reload password post-security so we can generate the token
        if (request.getUsername() != null) {
            final UserDetails userNew = userDetailsService.updateUser(request.getUsername(),
                    request.getFirstname(), request.getLastname(), request.getEmail());

            final String token = jwtTokenUtil.generateToken(userNew);

            // Return the token
            return ResponseEntity.ok(new JwtAuthenticationResponse(token));
        }
        else {
            // Return the token
            return ResponseEntity.ok(new JwtAuthenticationResponse(token0));
        }
    }

    @ExceptionHandler({AuthenticationException.class})
    public ResponseEntity<String> handleAuthenticationException(AuthenticationException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }

    /**
     * Authenticates the user. If something is wrong, an {@link AuthenticationException} will be thrown
     */
    private void authenticate(String username, String password) {
        Objects.requireNonNull(username);
        Objects.requireNonNull(password);

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new AuthenticationException("Disabled User", e);
        } catch (BadCredentialsException e) {
            throw new AuthenticationException("Incorrect Credentials", e);
        }
    }

    @RequestMapping(value = "${jwt.route.usersettings.get}", method = RequestMethod.GET)
    public ResponseEntity<?> getUserSettings(HttpServletRequest request) {
        String token = request.getHeader(tokenHeader).substring(7);
        String username = jwtTokenUtil.getUsernameFromToken(token);

        UserSettings settings = userSettingsService.getUserSettingsByUsername(username);
        if (settings == null) {
            settings = new UserSettings(username);
            if (userSettingsService.addUserSettings(settings)) {
                settings = userSettingsService.getUserSettingsByUsername(username);
            }
            else {
                settings = null;
            }
        }
        return ResponseEntity.ok(settings);
    }

    @RequestMapping(value = "${jwt.route.usersettings.put}",
            method = RequestMethod.POST,
            consumes = "application/json")
    public ResponseEntity<?> updateUserSettings(HttpServletRequest httpServletRequest,
                                                @RequestBody UserSettings request) {
        String token = httpServletRequest.getHeader(tokenHeader).substring(7);
        String username = jwtTokenUtil.getUsernameFromToken(token);

        UserSettings userSettings = userSettingsService.updateUserSettings(request);
        if (userSettings != null) {
            return ResponseEntity.ok(userSettingsService.getUserSettingsByUsername(username));
        }

        return ResponseEntity.badRequest().body(null);
    }

}
