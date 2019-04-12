package org.unipro.ugene.web.security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;
import org.unipro.ugene.web.model.AppSettings;
import org.unipro.ugene.web.security.JwtTokenUtil;
import org.unipro.ugene.web.service.AppSettingsService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.UUID;


@RestController
public class AppsRestController {

    @Value("${jwt.header}")
    private String tokenHeader;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    @Qualifier("appSettingsService")
    private AppSettingsService appSettingsService;

    @RequestMapping(value = "/auth/apps/put",
            method = RequestMethod.POST,
            consumes = "application/json")
    public ResponseEntity<?> addNewApplication(HttpServletRequest httpServletRequest,
                                               @RequestBody AppSettings request) {
        String token = httpServletRequest.getHeader(tokenHeader).substring(7);
        String username = jwtTokenUtil.getUsernameFromToken(token);

        AppSettings old = appSettingsService.getAppSettingsByName(request.getName());
        if (old == null) {
            boolean added = appSettingsService.addAppSettings(request);
            if (added) {
                AppSettings appSettings = appSettingsService.getAppSettingsByName(request.getName()); //appSettingsService.getAppSettingsByName(request.getName);
                return ResponseEntity.status(201).body(appSettings);
            }
        } else {
            return ResponseEntity.status(204).body(null);
        }

        return ResponseEntity.badRequest().body(null);
    }

    @RequestMapping(value = "/auth/apps/getall",
            method = RequestMethod.GET)
    public ResponseEntity<?> getAllApps(HttpServletRequest request) {
        String token = request.getHeader(tokenHeader).substring(7);
        String username = jwtTokenUtil.getUsernameFromToken(token);

        List<AppSettings> all = appSettingsService.getAllAppSettings(username);
        if (all != null) {//appSettingsService.getAppSettingsByName(request.getName);
            return ResponseEntity.status(200).body(all);
        } else {
            return ResponseEntity.status(204).body(null);
        }
    }

    @RequestMapping(value = "/auth/apps/delete",
            method = RequestMethod.POST,
            consumes = "application/json")
    public ResponseEntity<?> deleteApplication(HttpServletRequest httpServletRequest,
                                               @RequestBody AppSettings request) {
        UUID id = request.getId();
        AppSettings app = appSettingsService.getAppSettingsById(id);
        if (app != null) {
            appSettingsService.delete(app);
            return ResponseEntity.status(200).body(id);
        } else {
            return ResponseEntity.status(204).body(null);
        }
    }

    @RequestMapping(value = "/auth/apps/save",
            method = RequestMethod.POST,
            consumes = "application/json")
    public ResponseEntity<?> saveApplication(HttpServletRequest httpServletRequest,
                                               @RequestBody AppSettings request) {
        AppSettings old = appSettingsService.getAppSettingsById(request.getId());
        if (old != null) {
            AppSettings saved = appSettingsService.save(request);
            if (saved != null) {
                return ResponseEntity.status(200).body(saved);
            }
        } else {
            return ResponseEntity.status(204).body(null);
        }

        return ResponseEntity.badRequest().body(null);
    }

}
