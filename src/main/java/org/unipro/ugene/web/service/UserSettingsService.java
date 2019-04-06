package org.unipro.ugene.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.unipro.ugene.web.model.Book;
import org.unipro.ugene.web.model.UserSettings;
import org.unipro.ugene.web.repository.BookRespository;
import org.unipro.ugene.web.repository.UserSettingsRepository;

import java.util.List;

@Service("userSettingsService")
public class UserSettingsService {
    @Autowired
    private UserSettingsRepository userSettingsRepository;

    public List<UserSettings> getAllUserSettings() {
        return userSettingsRepository.findAll();
    }

    public boolean addUserSettings(UserSettings userSettings) {
        UserSettings save = userSettingsRepository.save(userSettings);

        return save != null;
    }

    public UserSettings getUserSettingsByUsername(String userName) {
        return userSettingsRepository.findByUsername(userName);
    }

    public UserSettings updateUserSettings(UserSettings settings) {
        return userSettingsRepository.saveAndFlush(settings);
    }
}
