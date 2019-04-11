package org.unipro.ugene.web.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "app")
@Data
@NoArgsConstructor
public class AppSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "username", length = 50)
    @NotNull
    @Size(min = 4, max = 50)
    private String username;

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
}

