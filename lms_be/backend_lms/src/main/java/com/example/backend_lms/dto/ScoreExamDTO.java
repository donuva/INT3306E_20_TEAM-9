package com.example.backend_lms.dto;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import lombok.Data;

@Data
public class ScoreExamDTO {
    private int id;

    private Double grade;

    @JsonIncludeProperties({"id","user"})
    private StudentDTO student;

    @JsonIncludeProperties({"id","course"})
    private ExamDTO exam;
}
