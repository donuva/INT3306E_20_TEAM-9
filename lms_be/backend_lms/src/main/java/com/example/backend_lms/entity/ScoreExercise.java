package com.example.backend_lms.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class ScoreExercise extends TimeAuditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String msg;

    private Double grade;

    private String exercise_url;

    @ManyToOne
    private Exercise exercise;

    @ManyToOne
    private Student student;

}
