package com.example.backend_lms.repo;

import com.example.backend_lms.entity.ScoreExercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScoreExerciseRepo extends JpaRepository<ScoreExercise, Integer> {
}
