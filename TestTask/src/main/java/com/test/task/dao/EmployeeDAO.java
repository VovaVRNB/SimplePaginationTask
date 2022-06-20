package com.test.task.dao;

import com.test.task.model.Employee;
import com.test.task.model.EmployeeDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface EmployeeDAO {

    int save(Employee employee);

    int update(Employee employee, int id);

    int delete(int id);

    Employee getById(int id);

    Page<EmployeeDTO> getAll(Pageable pageable);

    List<EmployeeDTO> search(String startWith);
}
