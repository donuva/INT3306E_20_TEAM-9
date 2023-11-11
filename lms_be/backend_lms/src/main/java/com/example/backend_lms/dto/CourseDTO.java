package com.example.backend_lms.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@Data
public class CourseDTO {
    private int id;

    private String name;

    private String category;

    private String description;

    @JsonIncludeProperties({"user","id"})
    private TeacherDTO teacher;

    @JsonIncludeProperties({"id", "topic"})
    private List<LessonDTO> lessonList;

    @JsonIncludeProperties({"id","title"})
    private List<ExerciseDTO> exerciseList;

    @JsonIncludeProperties({"user","id"})
    private List<StudentDTO> studentList;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @JsonFormat(pattern = "dd/MM/yyyy", timezone = "Asia/Ho_Chi_Minh")
    private Date createdAt;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @JsonFormat(pattern = "dd/MM/yyyy", timezone = "Asia/Ho_Chi_Minh")
    private Date updatedAt;
}
