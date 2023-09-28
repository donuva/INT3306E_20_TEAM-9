package com.example.backend_lms.service;

import com.example.backend_lms.dto.ExamDTO;
import com.example.backend_lms.entity.Exam;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class ExamService {
    //TODO: CRUD Exam
    //TODO: tao cau hoi, cau tra loi, cham diem

    public ExamDTO convert(Exam exam){
        return new ModelMapper().map(exam, ExamDTO.class);
    }

    @Transactional
    public void createExam(ExamDTO examDTO){
        if(examDTO)
    }
}
