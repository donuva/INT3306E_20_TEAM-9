package com.example.backend_lms.repo;

import com.example.backend_lms.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseRepo extends JpaRepository<Exercise, Integer> {
}
