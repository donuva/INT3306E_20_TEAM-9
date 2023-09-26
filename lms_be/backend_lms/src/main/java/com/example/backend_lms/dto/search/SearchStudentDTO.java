package com.example.backend_lms.dto.search;

import com.example.backend_lms.dto.CourseDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class SearchStudentDTO extends SearchDTO{
    private String name;
    private CourseDTO courseDTO;
}
