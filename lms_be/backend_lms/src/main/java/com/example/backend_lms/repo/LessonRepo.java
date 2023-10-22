package com.example.backend_lms.repo;

import com.example.backend_lms.dto.LessonDTO;
import com.example.backend_lms.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LessonRepo extends JpaRepository<Lesson, Integer> {

    @Query("select c FROM Course c where c.id = :x")
    List<Lesson> findByCourse(@Param("x") int course_id);
}
