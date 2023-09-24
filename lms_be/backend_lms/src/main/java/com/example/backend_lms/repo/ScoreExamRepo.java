package com.example.backend_lms.repo;

import com.example.backend_lms.entity.ScoreExam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScoreExamRepo extends JpaRepository<ScoreExam, Integer> {
}
