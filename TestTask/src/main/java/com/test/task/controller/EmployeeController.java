package com.test.task.controller;

import com.test.task.dao.EmployeeDAO;
import com.test.task.model.Employee;
import com.test.task.model.EmployeeDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("employees")
public class EmployeeController {

    private final EmployeeDAO employeeDAO;

    public EmployeeController(EmployeeDAO employeeDAO) {
        this.employeeDAO = employeeDAO;
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public Employee getById(@PathVariable final int id) {
        return employeeDAO.getById(id);
    }

    @PostMapping("")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public int saveEmployee(@RequestBody Employee employee) {
      return employeeDAO.save(employee);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public int updateEmployee(@RequestBody Employee employee, @PathVariable final int id) {
        return employeeDAO.update(employee, id);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public int deleteEmployee(@PathVariable final int id) {
        return employeeDAO.delete(id);
    }

    @GetMapping(params = { "page", "size" })
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public List<EmployeeDTO> findAllByPage(@RequestParam("page") final int page, @RequestParam("size") final int size) {
        PageRequest pageable = PageRequest.of(page, size);
        Page<EmployeeDTO> result = employeeDAO.getAll(pageable);
        if (!result.isEmpty())
            return result.getContent();
        else
            return new ArrayList<EmployeeDTO>();
    }

    @GetMapping("/search/{criteria}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public List<EmployeeDTO> searchEmployee(@PathVariable final String criteria) {
        return employeeDAO.search(criteria);
    }
}
