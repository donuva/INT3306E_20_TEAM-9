package com.example.backend_lms.repo;

import com.example.backend_lms.dto.ScoreExerciseDTO;
import com.example.backend_lms.entity.ScoreExercise;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ScoreExerciseRepo extends JpaRepository<ScoreExercise, Integer> {
    @Query("SELECT s from ScoreExercise s where s.student.id=:y and s.exercise.course.id =:x")
    List<ScoreExercise> findByStudentAndCourse(@Param("x") int course_id, @Param("y") int student_id);

    @Query("SELECT s FROM ScoreExercise s where s.exercise.id =:x")
    Page<ScoreExercise> findAllByExerciseId(@Param("x") int exercise_id, Pageable pageable);

    @Query("SELECT s FROM  ScoreExercise s where s.exercise.id =:y and s.student.id =:x")
    Optional<ScoreExercise> findByStudentAndExercise(@Param("x") int student_id, @Param("y") int exercise_id);

}
