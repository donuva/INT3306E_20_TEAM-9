package com.example.backend_lms.repo;

import com.example.backend_lms.dto.ExerciseDTO;
import com.example.backend_lms.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExerciseRepo extends JpaRepository<Exercise, Integer> {

    @Query("select e from Exercise e where e.course.id =:x")
    List<Exercise> findByCourseId(@Param("x") int course_id);


}
