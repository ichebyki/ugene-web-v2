package org.unipro.ugene.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import org.unipro.ugene.web.model.AppSettings;

import java.util.List;
import java.util.UUID;

@Repository
public interface AppSettingsRepository extends JpaRepository<AppSettings, UUID>, JpaSpecificationExecutor<AppSettings> {
    List<AppSettings> findAllByUsername(String username);

    AppSettings findById(String id);
    AppSettings findByName(String name);

}
