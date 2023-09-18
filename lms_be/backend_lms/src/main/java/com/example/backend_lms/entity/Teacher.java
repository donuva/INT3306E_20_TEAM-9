package com.example.backend_lms.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne(cascade = CascadeType.ALL,
            fetch = FetchType.EAGER)
    private User user;
}
