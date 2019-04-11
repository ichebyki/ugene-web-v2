package org.unipro.ugene.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.unipro.ugene.web.model.AppSettings;
import org.unipro.ugene.web.model.UserSettings;

import java.util.List;

public interface AppSettingsRepository extends JpaRepository<AppSettings, Long> {
    List<AppSettings> findAllByUsername(String username);
    AppSettings findById(String id);
    AppSettings findByName(String name);
}
