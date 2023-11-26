package com.example.backend_lms.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
public class ScoreExerciseDTO {
    private Integer id;

    private String content;

    private Double grade;

    private String exercise_url;

    @JsonIncludeProperties("id")
    private ExerciseDTO exercise;

    @JsonIncludeProperties({"id","user"})
    private StudentDTO student;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @JsonFormat(pattern = "dd/MM/yyyy", timezone = "Asia/Ho_Chi_Minh")
    private Date createdAt;


    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @JsonFormat(pattern = "dd/MM/yyyy", timezone = "Asia/Ho_Chi_Minh")
    private Date updatedAt;
}
