package com.example.backend_lms.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import lombok.Data;

@Data
public class CourseEnrollDTO {
    private int id;
    @JsonIgnoreProperties("courseList")
    private StudentDTO student;

    @JsonIncludeProperties("id")
    private CourseDTO course;

    //0 la chua duoc accept, 1 la duoc accept roi -> luu sang student list
    private int isAccept;
}
