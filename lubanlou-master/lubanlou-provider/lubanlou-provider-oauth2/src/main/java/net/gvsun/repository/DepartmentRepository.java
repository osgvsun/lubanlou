package net.gvsun.repository;

import net.gvsun.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DepartmentRepository extends JpaRepository<Department, Long> {

    @Query(value = "select d.* from department as d inner join user_department ud on d.id = ud.department_id where ud.username =?1", nativeQuery = true)
    List<Department> findByUsername(String username);

}
