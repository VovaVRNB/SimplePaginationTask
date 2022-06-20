package com.test.task.dao;

import com.test.task.model.ApplicationUser;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Repository()
public class ApplicationUserDAOImpl implements ApplicationUserDAO {

    private final JdbcTemplate jdbcTemplate;

    public ApplicationUserDAOImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Optional<ApplicationUser> selectApplicationUserByUsername(String username) {
        List<ApplicationUser> applicationUsers = jdbcTemplate.query("SELECT * FROM tblUsers WHERE usrName = '" + username + "'", (rs, rowNum) -> mapUserResult(rs));
        return applicationUsers
                .stream()
                .filter(applicationUser -> username.equals(applicationUser.getUsername()))
                .findFirst();
    }

    private ApplicationUser mapUserResult(final ResultSet rs) throws SQLException {
        return new ApplicationUser(
                rs.getString(2),
                rs.getString(3),
                new HashSet<>(Arrays.asList(new SimpleGrantedAuthority(rs.getString(4)))),
                true,
                true,
                true,
                true
        );
    }
}
