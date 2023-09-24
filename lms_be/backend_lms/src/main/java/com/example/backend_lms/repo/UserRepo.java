package com.example.backend_lms.repo;

import com.example.backend_lms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Integer> {
}
