package org.unipro.ugene.web.security.service;

import org.unipro.ugene.web.model.security.User;
import org.unipro.ugene.web.security.JwtUserFactory;
import org.unipro.ugene.web.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException(String.format("No user found with username '%s'.", username));
        } else {
            return JwtUserFactory.create(user);
        }
    }

    public UserDetails updateUser(String username,
                                  String firstname,
                                  String lastname,
                                  String email) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException(String.format("No user found with username '%s'.", username));
        } else {
            if (firstname != null) {
                user.setFirstname(firstname);
            }
            if (lastname != null) {
                user.setLastname(lastname);
            }
            if (email != null) {
                user.setEmail(email);
            }
            userRepository.saveAndFlush(user);
            return JwtUserFactory.create(user);
        }
    }

}
