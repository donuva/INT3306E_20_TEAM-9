package com.example.backend_lms.repo;

import com.example.backend_lms.entity.ResetRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResetRequestRepo extends JpaRepository<ResetRequest,Integer> {
    ResetRequest findByUsername(String username);
}
