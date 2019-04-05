package org.unipro.ugene.web.security;

import java.io.Serializable;

public class JwtProfileRequest implements Serializable {

    private static final long serialVersionUID = 699746494756651939L;

    private String username;
    private String firstname;
    private String lastname;
    private String email;
    private boolean enabled;

    public JwtProfileRequest() {
        super();
    }

    public JwtProfileRequest(String username, String firstname, String lastname, String email, boolean enabled) {
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.enabled = enabled;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
