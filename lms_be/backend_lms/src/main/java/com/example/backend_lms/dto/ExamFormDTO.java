package com.example.backend_lms.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import lombok.Data;

import java.util.Date;
import java.util.List;

//map ra cho hoc sinh lam
@Data
public class ExamFormDTO {
    @JsonIgnoreProperties("correct_answer")
    List<QuestionDTO> questionList;
    private int id; //exam id

    @JsonIncludeProperties("id")
    private CourseDTO course;

    private StudentDTO student;

    private String title;

    private Date deadline;

    private int duration;
}