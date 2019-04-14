package org.unipro.ugene.web.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "settings")
@Data
@NoArgsConstructor
public class UserSettings {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "USERNAME", length = 50, unique = true)
    @NotNull
    @Size(min = 4, max = 50)
    private String username;

    @Lob
    @Column(name = "WORKDIR", length = 50, unique = false)
    private String workdir;

    @Column(name = "SONARHOST", length = 128, unique = false)
    private String sonarhost;

    @Column(name = "SONARPORT", unique = false)
    private int sonarport;

    @Column(name = "SONARLOGIN", length = 50, unique = false)
    @Size(min = 4, max = 50)
    private String sonarlogin;

    @Column(name = "SONARPASSWORD", length = 100)
    private String sonarpassword;

    @Lob
    @Column(name = "SONARRUNNERPATH", length = 50, unique = false)
    private String sonarrunnerpath;

    public UserSettings(@NotNull @Size(min = 4, max = 50) String username) {
        this.username = username;
        this.workdir = "e:\\WORKS\\Unipro\\jazz-work-dir\\";
        this.sonarhost = "localhost";
        this.sonarport = 9000;
        this.sonarlogin = "admin";
        this.sonarpassword = "admin";
        this.sonarrunnerpath = "e:\\ichebyki\\VirtualBoxVM\\share\\unipro\\Jazz\\sonar-runner-2.4\\bin\\sonar-runner.bat";
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getWorkdir() {
        return workdir;
    }

    public String getSonarhost() {
        return sonarhost;
    }

    public int getSonarport() {
        return sonarport;
    }

    public String getSonarlogin() {
        return sonarlogin;
    }

    public String getSonarpassword() {
        return sonarpassword;
    }

    public String getSonarrunnerpath() {
        return sonarrunnerpath;
    }
}

