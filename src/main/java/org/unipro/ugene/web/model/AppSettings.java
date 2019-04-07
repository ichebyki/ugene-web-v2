package org.unipro.ugene.web.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "settings")
@Data
@NoArgsConstructor
public class AppSettings {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    @Column(name = "uuid", unique = true)
    @NotNull
    private String uuid;

    @Column(name = "name", length = 50, unique = true)
    @NotNull
    private String name;

    @Column(name = "classPathList")
    @NotNull
    private String classPathList;

    @Column(name = "sourcePath")
    @NotNull
    private String sourcePath;

    @Column(name = "testPathList")
    private String testPathList;

    @Column(name = "monitoringPort")
    @NotNull
    private int monitoringPort;

    @Column(name = "httpMonitoringPort")
    @NotNull
    private int httpMonitoringPort;

    @Column(name = "standalone")
    @NotNull
    private int standalone;

    /*public AppSettings() {
        this.name = "<app-name-" + id + ">";
        this.classPathList = "";
        this.sourcePath = "";
        this.testPathList = "";
        this.monitoringPort = 6300;
        this.httpMonitoringPort = -1;
        this.standalone = 0;
    }*/
}

