package com.example.backend_lms.repo;

import com.example.backend_lms.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepo extends JpaRepository<Question, Integer> {
}
