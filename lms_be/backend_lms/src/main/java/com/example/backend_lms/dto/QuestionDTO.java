package com.example.backend_lms.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@Data
public class QuestionDTO {
    private int id;

    private String content;

    private String opt1;

    private String opt2;

    private String opt3;

    private String opt4;

    @NotBlank
    private Integer correct_answer;

    @JsonIncludeProperties("id")
    private ExamDTO exam;

    //lay dap an dau vao
    @JsonIgnore
    private Integer chosen_answer_id;

}
