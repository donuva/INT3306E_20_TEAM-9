package com.example.backend_lms.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@Entity

public class Question{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String content;

    private String opt1;

    private String opt2;

    private String opt3;

    private String opt4;

    //1234
    private int correct_answer;

    @ManyToOne
    private Exam exam;
}
