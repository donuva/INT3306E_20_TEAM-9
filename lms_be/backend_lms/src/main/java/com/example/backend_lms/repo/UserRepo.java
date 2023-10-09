package com.example.backend_lms.repo;

import com.example.backend_lms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepo extends JpaRepository<User, Integer> {
    @Query("select u FROM User u where u.username = :x")
    User findByUsername(@Param("x") String username);
}
