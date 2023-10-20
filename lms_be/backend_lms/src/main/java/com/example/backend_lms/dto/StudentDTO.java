package com.example.backend_lms.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import lombok.Data;

import java.util.List;

@Data
public class StudentDTO {
    private int id;

    private UserDTO user;

    @JsonIncludeProperties({"id","name"})
    private List<CourseDTO> courseList;

    @JsonIgnore
    private List<ScoreExerciseDTO> scoreExerciseList;
}
