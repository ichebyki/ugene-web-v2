package org.unipro.ugene.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.unipro.ugene.web.model.AppSettings;
import org.unipro.ugene.web.repository.AppSettingsRepository;

import java.util.List;

@Service("appSettingsService")
public class AppSettingsService {
    @Autowired
    private AppSettingsRepository appSettingsRepository;

    public List<AppSettings> getAllAppSettings() {
        return appSettingsRepository.findAll();
    }

    public boolean addAppSettings(AppSettings appSettings) {
        AppSettings save = appSettingsRepository.save(appSettings);

        return save != null;
    }

    public AppSettings getAppSettingsByUuid(String uuid) {
        return appSettingsRepository.findByUuid(uuid);
    }

    public AppSettings updateAppSettings(AppSettings settings) {
        return appSettingsRepository.saveAndFlush(settings);
    }
}
