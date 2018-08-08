package org.unipro.ugene.web.security.repository;

import org.unipro.ugene.web.model.security.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
