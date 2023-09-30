package com.example.backend_lms.repo;

import com.example.backend_lms.entity.Conversation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ConversationRepo extends JpaRepository<Conversation, Integer> {
    @Query("select c from Conversation c where c.course.id = :x")
    Page<Conversation> findAllByCourse(@Param("x") int id, Pageable pageable);
}
