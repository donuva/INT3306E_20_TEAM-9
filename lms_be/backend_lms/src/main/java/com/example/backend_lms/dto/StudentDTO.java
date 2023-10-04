package com.example.backend_lms.dto;

import com.example.backend_lms.entity.ScoreExam;
import com.example.backend_lms.entity.ScoreExercise;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.List;

@Data
public class StudentDTO {
    private int id;

    private UserDTO user;

    @JsonIncludeProperties({"id","name"})
    private List<CourseDTO> courseList;

    @JsonIgnore
    private List<ScoreExamDTO> scoreExamList;

    @JsonIgnore
    private List<ScoreExerciseDTO> scoreExerciseList;
}
