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
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
public class ReportRestController {

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

    @RequestMapping(value = "/auth/apps/static/report/fetch",
            method = RequestMethod.POST,
            consumes = "application/json")
    public ResponseEntity<?> fetchStaticReport(HttpServletRequest httpServletRequest,
                                               @RequestBody AppSettings request) {
        if (!CheckHttpRequest(httpServletRequest, request)) {
            return ResponseEntity.status(401).body(null);
        }

        UserSettings settings = userSettingsService.getUserSettingsByUsername(request.getUsername());
        Map<String,String> response = new HashMap<String, String>();
        if (settings == null) {
            response.put("message", "User settings are not set");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else if (request == null) {
            response.put("message", "Application settings are not set");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else {
            StaticRunner runner = new StaticRunner(reportStaticIssueService,
                    appSettingsService, settings, request);
            String result = runner.fetchReport();
            return ResponseEntity.status(HttpStatus.OK).body(result);
        }
    }

    @RequestMapping(value = "/auth/apps/static/report/getpakkages",
            method = RequestMethod.POST,
            consumes = "application/json")
    public ResponseEntity<?> getStaticReportAllPackages(HttpServletRequest httpServletRequest,
                                                        @RequestBody AppSettings request) {
        if (!CheckHttpRequest(httpServletRequest, request)) {
            return ResponseEntity.status(401).body(null);
        }

        UserSettings settings = userSettingsService.getUserSettingsByUsername(request.getUsername());
        Map<String,String> response = new HashMap<String, String>();
        if (settings == null) {
            response.put("message", "User settings are not set");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else if (request == null) {
            response.put("message", "Application settings are not set");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else {
            List<String> result = reportStaticIssueService.getAllPakkagesByAppid(request.getId());
            return ResponseEntity.status(HttpStatus.OK).body(result);
        }
    }

    @RequestMapping(value = "/auth/apps/static/report/getclasses",
            method = RequestMethod.POST,
            consumes = "application/json")
    public ResponseEntity<?> getStaticReportKlasses(HttpServletRequest httpServletRequest,
                                                        @RequestBody HttpRequestDTO request) {
        AppSettings app = request.getApp();
        if (!CheckHttpRequest(httpServletRequest, app)) {
            return ResponseEntity.status(401).body(null);
        }

        UserSettings settings = userSettingsService.getUserSettingsByUsername(app.getUsername());
        Map<String,String> response = new HashMap<String, String>();
        if (settings == null) {
            response.put("message", "User settings are not set");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else if (app == null) {
            response.put("message", "Application settings are not set");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else {
            List<String> result = reportStaticIssueService.getAllClassesByAppidAndPakkage(app.getId(),
                    request.getApppakkage());
            return ResponseEntity.status(HttpStatus.OK).body(result);
        }
    }

    @RequestMapping(value = "/auth/apps/static/report/getsource",
            method = RequestMethod.POST,
            consumes = "application/json")
    public ResponseEntity<?> getStaticReportSource(HttpServletRequest httpServletRequest,
                                                        @RequestBody HttpRequestDTO request) {
        AppSettings app = request.getApp();
        String pakkage = request.getApppakkage();
        String source = request.getAppclass();
        if (!CheckHttpRequest(httpServletRequest, app)) {
            return ResponseEntity.status(401).body(null);
        }

        UserSettings settings = userSettingsService.getUserSettingsByUsername(app.getUsername());
        Map<String,String> response = new HashMap<String, String>();
        if (settings == null) {
            response.put("message", "User settings are not set");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else if (app == null) {
            response.put("message", "Application settings are not set");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else {
            File file = new File(settings.getWorkdir(), app.getId().toString() + "-static");
            file = new File(file.getPath(), "src");
            file = new File(file.getPath(), pakkage);
            file = new File(file.getPath(), source);
            String result;
            try {
                result = new String(Files.readAllBytes(file.toPath()));
            } catch (IOException e) {
                result = "Error while reading content of the file '"
                        + pakkage + File.pathSeparator + source + "'\n" + e.getMessage();
            }
            return ResponseEntity.status(HttpStatus.OK).body(result);
        }
    }

    private boolean CheckHttpRequest(HttpServletRequest httpServletRequest,
                                     AppSettings request) {
        AppSettings app = appSettingsService.getAppSettingsById(request.getId());
        String token = httpServletRequest.getHeader(tokenHeader).substring(7);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        if (!username.equals(request.getUsername()) && !app.getId().equals(request.getId())) {
            return false;
        }
        return true;
    }

}
