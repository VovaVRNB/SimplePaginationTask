package com.test.task.dao;

import com.test.task.model.Department;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class DepartmentsDAOImpl implements DepartmentDAO {

    private final JdbcTemplate jdbcTemplate;

    public DepartmentsDAOImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Department> getAll() {
        return jdbcTemplate.query("SELECT * FROM tblDepartments", (rs, rowNum) -> mapDepartmentResult(rs));
    }

    private Department mapDepartmentResult(final ResultSet rs) throws SQLException {
        return Department.builder()
                .dpID(rs.getLong(1))
                .dpName(rs.getString(2))
                .build();
    }
}
