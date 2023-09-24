package com.example.backend_lms.repo;


import com.example.backend_lms.entity.Exam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamRepo extends JpaRepository<Exam, Integer> {
}
