package com.example.backend_lms.repo;

import com.example.backend_lms.entity.CourseEnroll;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CourseEnrollRepo extends JpaRepository<CourseEnroll, Integer> {
    @Query("select c FROM CourseEnroll c where c.student.id = :x and c.course.id = :y")
    Optional<CourseEnroll> findByCourseAndStudent(@Param("x") int student_id, @Param("y") int course_id);

    @Query("SELECT c FROM CourseEnroll c where c.course.id =:x and c.status=0")
    List<CourseEnroll> findAllByCourse(@Param("x") int course_id);

    @Transactional
    @Modifying
    @Query("DELETE From CourseEnroll c where c.course.id = :y and c.student.id=:x")
    void deleteByCourseAndStudent(@Param("x") int student_id, @Param("y") int course_id);
}
