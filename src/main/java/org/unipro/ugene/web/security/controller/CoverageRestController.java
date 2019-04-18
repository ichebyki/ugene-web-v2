package org.unipro.ugene.web.security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.unipro.ugene.web.coverage.StaticRunner;
import org.unipro.ugene.web.model.AppSettings;
import org.unipro.ugene.web.model.UserSettings;
import org.unipro.ugene.web.security.JwtTokenUtil;
import org.unipro.ugene.web.service.AppSettingsService;
import org.unipro.ugene.web.service.ReportStaticIssueService;
import org.unipro.ugene.web.service.UserSettingsService;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;


@RestController
public class CoverageRestController {

    @Value("${jwt.header}")
    private String tokenHeader;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    @Qualifier("appSettingsService")
    private AppSettingsService appSettingsService;

    @Autowired
    @Qualifier("userSettingsService")
    private UserSettingsService userSettingsService;

    @Autowired
    @Qualifier("reportStaticIssueService")
    private ReportStaticIssueService reportStaticIssueService;

    @RequestMapping(value = "/auth/apps/static/report/runsonar",
            method = RequestMethod.POST,
            consumes = "application/json")
    public ResponseEntity<?> coverageRunStatic(HttpServletRequest httpServletRequest,
                                               @RequestBody AppSettings request) {
        AppSettings app = appSettingsService.getAppSettingsById(request.getId());

        String token = httpServletRequest.getHeader(tokenHeader).substring(7);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        if (!username.equals(request.getUsername())) {
            return ResponseEntity.status(401).body(null);
        }

        UserSettings settings = userSettingsService.getUserSettingsByUsername(username);
        Map<String,String> response = new HashMap<String, String>();
        if (settings == null) {
            response.put("message", "User settings are not set");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else if (app == null) {
            response.put("message", "Application settings are not set");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else {
            StaticRunner runner = new StaticRunner(reportStaticIssueService,
                    appSettingsService, settings, app);
            String message = runner.runSonarRunner();

            if (message == null) {
                return ResponseEntity.status(HttpStatus.OK).body(null);
            }
            else {
                response.put("message", message);
                return ResponseEntity.badRequest().body(response);
            }
        }
    }

}
