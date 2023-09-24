package com.example.backend_lms.repo;

import com.example.backend_lms.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepo extends JpaRepository<Answer, Integer> {
}
