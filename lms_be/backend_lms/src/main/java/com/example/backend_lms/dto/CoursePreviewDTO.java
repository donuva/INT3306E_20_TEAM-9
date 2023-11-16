package com.example.backend_lms.dto;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import lombok.Data;

@Data
public class CoursePreviewDTO {
        private int id;

        private String name;

        private String description;

        private String category;

        @JsonIncludeProperties({"user","id"})
        private TeacherDTO teacher;

        //0 dang doi 1 la dong y 2 la deny -1 la chua co
        private int status;
    }

