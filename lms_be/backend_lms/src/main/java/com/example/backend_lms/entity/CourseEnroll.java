package com.example.backend_lms.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class CourseEnroll {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    private Student student;

    @ManyToOne
    private Course course;

    //0 la chua duoc accept ->pending, 1 la duoc accept roi -> luu sang student list, 2 la bi deny
    private int status;
}
