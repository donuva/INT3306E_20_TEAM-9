package com.example.backend_lms.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;
import java.util.List;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Exam extends TimeAuditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    private Course course;

    private Date deadline;

    private int duration;

    @OneToMany(mappedBy = "exam")
    private List<ScoreExam> scoreExamList;

    @OneToMany(mappedBy = "exam")
    private List<Question> questionList;


}
