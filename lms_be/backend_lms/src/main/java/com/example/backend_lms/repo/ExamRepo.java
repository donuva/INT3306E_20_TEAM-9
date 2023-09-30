package com.example.backend_lms.repo;


import com.example.backend_lms.dto.ExamDTO;
import com.example.backend_lms.entity.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExamRepo extends JpaRepository<Exam, Integer> {

    @Query("SELECT e FROM Exam e where e.course.id =:x")
    List<Exam> findByCourse(@Param("x") int course_id);
}
