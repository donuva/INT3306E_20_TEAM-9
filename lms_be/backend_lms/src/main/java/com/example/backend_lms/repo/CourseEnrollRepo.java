package com.example.backend_lms.repo;

import com.example.backend_lms.entity.CourseEnroll;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseEnrollRepo extends JpaRepository<CourseEnroll, Integer> {
}
