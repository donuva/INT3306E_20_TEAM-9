package com.example.backend_lms.dto;

import com.example.backend_lms.entity.Exercise;
import com.example.backend_lms.entity.Lesson;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@Data
public class CourseDTO {
    private int id;

    private String name;

    private String description;

    @JsonIgnoreProperties("courseList")
    private TeacherDTO teacherDTO;

    @JsonIgnoreProperties("course")
    private List<LessonDTO> lessonList;

    @JsonIgnoreProperties("course")
    private List<ExamDTO> examList;

    @JsonIgnoreProperties("course")
    private List<ExerciseDTO> exerciseList;

    @JsonIgnoreProperties("courseList")
    private List<StudentDTO> studentList;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @JsonFormat(pattern = "dd/MM/yyyy", timezone = "Asia/Ho_Chi_Minh")
    private Date createdDate;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @JsonFormat(pattern = "dd/MM/yyyy", timezone = "Asia/Ho_Chi_Minh")
    private Date updatedAt;
}
