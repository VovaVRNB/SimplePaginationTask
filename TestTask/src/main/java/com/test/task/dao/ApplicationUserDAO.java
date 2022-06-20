package com.test.task.dao;

import com.test.task.model.ApplicationUser;

import java.util.Optional;

public interface ApplicationUserDAO {
    Optional<ApplicationUser> selectApplicationUserByUsername(String username);
}
