package com.example.backend_lms.repo;

import com.example.backend_lms.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface StudentRepo extends JpaRepository<Student, Integer> {
    @Query("select s from Student s where s.user.name like :x")
    Page<Student> findByName(@Param("x") String name, Pageable pageable);

    Optional<Student> findByUserId(int id);

    @Query("SELECT s FROM Student s where s.user.name like :x and :y not in (select c.id from s.courseList c)")
    Page<Student> searchStudentNotInCourse(@Param("y") int course_id, @Param("x") String student_name, Pageable pageable);
}
