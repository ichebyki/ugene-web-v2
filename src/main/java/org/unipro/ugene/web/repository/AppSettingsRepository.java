package org.unipro.ugene.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.unipro.ugene.web.model.AppSettings;
import org.unipro.ugene.web.model.UserSettings;

public interface AppSettingsRepository extends JpaRepository<AppSettings, Long> {
    AppSettings findByUuid(String uuid);
}
