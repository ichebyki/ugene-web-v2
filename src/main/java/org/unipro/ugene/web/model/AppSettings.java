package org.unipro.ugene.web.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "app")
@Data
@NoArgsConstructor
public class AppSettings {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(columnDefinition = "uuid",
            name = "id",
            updatable = false,
            nullable = false)
    private UUID id;

    @Column(name = "username", length = 50)
    @NotNull
    @Size(min = 4, max = 50)
    private String username;

    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDateTime;

    @Column(name = "name", length = 500, unique = true)
    @NotNull
    private String name;

    @Column(name = "classPathList")
    @NotNull
    private ArrayList<String> classPathList;

    @Column(name = "sourcePath")
    @NotNull
    private String sourcePath;

    @Column(name = "testPathList")
    private ArrayList<String> testPathList;

    @Column(name = "monitoringPort")
    @NotNull
    private int monitoringPort;

    @Column(name = "httpMonitoringPort")
    @NotNull
    private int httpMonitoringPort;

    @Column(name = "standalone")
    @NotNull
    private boolean standalone;

    @Column(name = "staticstate")
    private AppStateStatic staticstate = AppStateStatic.STATIC_ANALYZE_NOT_RUN;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ArrayList<String> getClassPathList() {
        return classPathList;
    }

    public void setClassPathList(ArrayList<String> classPathList) {
        this.classPathList = classPathList;
    }

    public String getSourcePath() {
        return sourcePath;
    }

    public void setSourcePath(String sourcePath) {
        this.sourcePath = sourcePath;
    }

    public ArrayList<String> getTestPathList() {
        return testPathList;
    }

    public void setTestPathList(ArrayList<String> testPathList) {
        this.testPathList = testPathList;
    }

    public int getMonitoringPort() {
        return monitoringPort;
    }

    public void setMonitoringPort(int monitoringPort) {
        this.monitoringPort = monitoringPort;
    }

    public int getHttpMonitoringPort() {
        return httpMonitoringPort;
    }

    public void setHttpMonitoringPort(int httpMonitoringPort) {
        this.httpMonitoringPort = httpMonitoringPort;
    }

    public boolean isStandalone() {
        return standalone;
    }

    public void setStandalone(boolean standalone) {
        this.standalone = standalone;
    }

    public AppStateStatic getStaticstate() {
        return staticstate;
    }

    public void setStaticstate(AppStateStatic staticstate) {
        this.staticstate = staticstate;
    }

    public enum AppStateStatic {
        UNDEFINED,
        STATIC_ANALYZE_NOT_RUN,
        STATIC_ANALYZE_STARTED,
        STATIC_ANALYZE_COMPLETED,
        STATIC_REPORT_NOT_RUN,
        STATIC_REPORT_STARTED,
        STATIC_REPORT_READY
    }
}

