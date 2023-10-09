package com.example.backend_lms.dto;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import lombok.Data;

@Data
public class CourseListDTO {
    private int id;

    private String name;

    private String description;

    @JsonIncludeProperties({"user.name","id"})
    private TeacherDTO teacher;
}
