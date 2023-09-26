package com.example.backend_lms.repo;

import com.example.backend_lms.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface StudentRepo extends JpaRepository<Student, Integer> {
    @Query("select s from Student s where s.user.name like :x")
    Page<Student> findByName(@Param("x") String name);

    Optional<Student> findByUserId(int id);
}
