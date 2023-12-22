package com.example.backend_lms.repo;

import com.example.backend_lms.entity.Course;
import com.example.backend_lms.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NotificationRepo extends JpaRepository<Notification, Integer> {

    @Query("select n from Notification n where n.course.id = :x")
    Page<Notification> findAllByCourse(@Param("x") int course_id, Pageable pageable);

    @Query("select n from Notification n where n.course.id in :x")
    Page<Notification> findAllByStudent(@Param("x") List<Integer> courses_id, Pageable pageable);

    @Query("SELECT n FROM Notification n WHERE n.course.id = :x")
    List<Notification> findAllByCourse(@Param("x") int course_id);
}
