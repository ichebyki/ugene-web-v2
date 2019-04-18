package org.unipro.ugene.web.security.controller;

import org.unipro.ugene.web.model.AppSettings;

public class HttpRequestDTO {

    AppSettings app;
    String apppakkage;
    String appclass;
    String severity;

    public HttpRequestDTO() {
    }

    public AppSettings getApp() {
        return app;
    }

    public void setApp(AppSettings app) {
        this.app = app;
    }

    public String getApppakkage() {
        return apppakkage;
    }

    public void setApppakkage(String apppakkage) {
        this.apppakkage = apppakkage;
    }

    public String getAppclass() {
        return appclass;
    }

    public void setAppclass(String appclass) {
        this.appclass = appclass;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }
}
