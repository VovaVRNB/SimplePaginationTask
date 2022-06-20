package com.test.task.dao;

import com.test.task.model.Employee;
import com.test.task.model.EmployeeDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class EmployeeDAOImpl implements EmployeeDAO {

    private final JdbcTemplate jdbcTemplate;

    public EmployeeDAOImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int save(Employee employee) {
        return jdbcTemplate.update("INSERT INTO tblEmployees (empName, empActive, emp_dpID) VALUES (?, ?, ?)", new Object[]{employee.getEmpName(), employee.getEmpActive(), employee.getEmp_dpID()});
    }

    @Override
    public int update(Employee employee, int id) {
        return jdbcTemplate.update("UPDATE tblEmployees SET empName = ?, empActive = ?, emp_dpID = ? WHERE empID = ?", new Object[]{employee.getEmpName(), employee.getEmpActive(), employee.getEmp_dpID(), id});
    }

    @Override
    public int delete(int id) {
        return jdbcTemplate.update("DELETE FROM tblEmployees WHERE empID = ?", id);
    }

    @Override
    public Employee getById(int id) {
        return jdbcTemplate.queryForObject("SELECT * FROM tblEmployees WHERE empID = ?", new BeanPropertyRowMapper<Employee>(Employee.class), id);
    }

    @Override
    public Page<EmployeeDTO> getAll(Pageable page) {
        Sort.Order order = !page.getSort().isEmpty() ? page.getSort().toList().get(0) : Sort.Order.by("empID");

        List<EmployeeDTO> employeeDTOs = jdbcTemplate.query("SELECT empID, empName, IF(empActive, 'YES', 'NO') empActive, dpName FROM\n" +
                        "tblEmployees JOIN tblDepartments ON emp_dpID = dpID ORDER BY " + order.getProperty() + " "
                        + order.getDirection().name() + " LIMIT " + page.getPageSize() + " OFFSET " + page.getOffset(),
                (rs, rowNum) -> mapEmployeeResult(rs));
        return new PageImpl<EmployeeDTO>(employeeDTOs, page, count());
    }

    @Override
    public List<EmployeeDTO> search(String startWith) {
        List<EmployeeDTO> employees = jdbcTemplate.query("SELECT empID, empName, IF(empActive, 'YES', 'NO') empActive, dpName FROM\n" +
                "tblEmployees JOIN tblDepartments ON emp_dpID = dpID WHERE empName LIKE '" + startWith + "%'", (rs, rowNum) -> mapEmployeeResult(rs));
        return employees;
    }

    private int count() {
        return jdbcTemplate.queryForObject("SELECT count(*) FROM tblEmployees", Integer.class);
    }

    private EmployeeDTO mapEmployeeResult(final ResultSet rs) throws SQLException {
        return EmployeeDTO.builder()
                .empID(rs.getLong(1))
                .empName(rs.getString(2))
                .empActive(rs.getString(3))
                .dpName(rs.getString(4))
                .build();
    }
}
