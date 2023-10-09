package com.example.backend_lms.repo;

import com.example.backend_lms.entity.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseRepo extends JpaRepository<Course, Integer> {

    @Query("select c from Course c where c.id in :x")
    Page<Course> findByCourseList(@Param("x") List<Integer> course_id, Pageable pageable);

    @Query("select c FROM Course c where c.category in :x")
    Page<Course> findByCourseCategory(@Param("x") List<String> categories, Pageable pageable);
}
