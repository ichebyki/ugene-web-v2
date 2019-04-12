package org.unipro.ugene.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.unipro.ugene.web.model.AppSettings;
import org.unipro.ugene.web.repository.AppSettingsRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service("appSettingsService")
public class AppSettingsService {
    @Autowired
    private AppSettingsRepository appSettingsRepository;

    public List<AppSettings> getAllAppSettings(String username) {
        return appSettingsRepository.findAllByUsername(username);
    }

    public boolean addAppSettings(AppSettings appSettings) {
        AppSettings save = appSettingsRepository.save(appSettings);

        return save != null;
    }

    public AppSettings getAppSettingsById(String id) {
        return appSettingsRepository.findById(id);
    }

    public AppSettings getAppSettingsById(UUID id) {
        Optional<AppSettings> opt = appSettingsRepository.findById(id);
        if (opt.isPresent()) {
            return opt.get();
        }
        return null;
    }

    public void deleteAppSettingsById(UUID id) {
        appSettingsRepository.deleteById(id);
    }

    public AppSettings getAppSettingsByName(String name) {
        return appSettingsRepository.findByName(name);
    }

    public AppSettings updateAppSettings(AppSettings settings) {
        return appSettingsRepository.saveAndFlush(settings);
    }

    public void delete(AppSettings app) {
        appSettingsRepository.delete(app);
    }

    public AppSettings save(AppSettings app) {
        return appSettingsRepository.save(app);
    }
}
