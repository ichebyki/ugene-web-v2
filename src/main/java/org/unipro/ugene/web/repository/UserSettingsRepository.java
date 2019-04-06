package org.unipro.ugene.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.unipro.ugene.web.model.UserSettings;

public interface UserSettingsRepository extends JpaRepository<UserSettings, Long> {
    UserSettings findByUsername(String username);
}
