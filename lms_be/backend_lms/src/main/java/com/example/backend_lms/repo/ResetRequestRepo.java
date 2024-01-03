package com.example.backend_lms.repo;

import com.example.backend_lms.entity.ResetRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ResetRequestRepo extends JpaRepository<ResetRequest,Integer> {
    @Query("select r FROM ResetRequest r where r.username =:username")
    ResetRequest findByUsername(@Param("username") String username);
}
