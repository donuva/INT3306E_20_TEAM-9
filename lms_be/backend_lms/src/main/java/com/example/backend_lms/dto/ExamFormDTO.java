package com.example.backend_lms.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import lombok.Data;

import java.util.List;

@Data
public class ExamFormDTO {
    @JsonIncludeProperties({"id","content", "answerList", "chosen_answer_id"})
    List<QuestionDTO> questionList;
}
