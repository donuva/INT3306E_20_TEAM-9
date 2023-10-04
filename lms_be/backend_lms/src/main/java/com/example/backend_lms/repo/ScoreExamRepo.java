package com.example.backend_lms.repo;

import com.example.backend_lms.dto.ScoreExamDTO;
import com.example.backend_lms.entity.ScoreExam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ScoreExamRepo extends JpaRepository<ScoreExam, Integer> {
    @Query("select s FROM ScoreExam s where s.student.id = :y and s.exam.course.id = :x")
    List<ScoreExam> findByStudentAndCourse(@Param("x") int course_id, @Param("y") int student_id);

    @Query("SELECT s FROM ScoreExam s where s.student.id =:x and s.exam.id = :y")
    Optional<ScoreExam> findByStudentAndExam(@Param("x") int student_id, @Param("y") int exam_id);

    @Query("SELECT s FROM ScoreExam s where s.exam.id = :x")
    Page<ScoreExam> findAllByExamId(@Param("x") int exam_id, Pageable pageable);
}
