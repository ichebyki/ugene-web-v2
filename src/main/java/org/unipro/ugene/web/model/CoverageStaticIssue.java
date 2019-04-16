package org.unipro.ugene.web.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.UUID;

@Entity
@Table(name = "coverage_static_issue")
@Data
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class CoverageStaticIssue {
    /*
        Long id;
        UUID appId;
        String source;
        int line;
        String message;
        String package;
        String severity;
     */

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "uuid",
            name = "appid",
            nullable = false)
    @NotNull
    private UUID appid;

    @Column(name = "source")
    @NotNull
    @Size(min = 6, max = 2048)
    private String source;

    @Column(name = "line")
    private int line;

    @Column(name = "message")
    @NotNull
    private String message;

    @Column(name = "pakkage")
    @NotNull
    private String pakkage;

    @Column(name = "severity")
    @NotNull
    private String severity;


    public Long getId() {
        return id;
    }

    public UUID getAppid() {
        return appid;
    }

    public String getSource() {
        return source;
    }

    public String getPakkage() {
        return pakkage;
    }

    public int getLine() {
        return line;
    }

    public String getMessage() {
        return message;
    }

    public String getSeverity() {
        return severity;
    }

    public void setAppid(UUID appid) {
        this.appid = appid;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public void setPakkage(String pakkage) {
        this.pakkage = pakkage;
    }

    public void setLine(int line) {
        this.line = line;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }
}

