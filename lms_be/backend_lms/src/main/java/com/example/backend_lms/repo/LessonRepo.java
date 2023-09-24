package com.example.backend_lms.repo;

import com.example.backend_lms.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LessonRepo extends JpaRepository<Lesson, Integer> {
}
