package com.example.backend_lms.repo;

import com.example.backend_lms.entity.Teacher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface TeacherRepo extends JpaRepository<Teacher, Integer> {
    @Query("select t from Teacher t where t.user.name = :x")
    Page<Teacher> findByName(@Param("x") String name, Pageable pageable);

    Optional<Teacher> findByUserId(int id);
}
