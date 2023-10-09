package com.example.backend_lms.service;

import com.example.backend_lms.dto.ExamDTO;
import com.example.backend_lms.dto.ExamFormDTO;
import com.example.backend_lms.dto.QuestionDTO;
import com.example.backend_lms.entity.Exam;
import com.example.backend_lms.entity.ScoreExam;
import com.example.backend_lms.entity.Student;
import com.example.backend_lms.exception.ExpiredDateException;
import com.example.backend_lms.repo.CourseRepo;
import com.example.backend_lms.repo.ExamRepo;
import com.example.backend_lms.repo.QuestionRepo;
import com.example.backend_lms.repo.ScoreExamRepo;
import jakarta.transaction.Transactional;
import javassist.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static org.assertj.core.util.DateUtil.now;

@Service
public class ExamService {


    @Autowired
    ExamRepo examRepo;

    @Autowired
    CourseRepo courseRepo;

    @Autowired
    ScoreExamRepo scoreExamRepo;

    @Autowired
    QuestionRepo questionRepo;

    public ExamDTO convert(Exam exam) {
        return new ModelMapper().map(exam, ExamDTO.class);
    }

    /*
    Giao vien tao, sua, xoa, xem exam
     */
    @Transactional
    public void createExam(ExamDTO examDTO) throws NotFoundException {
        if (courseRepo.findById(examDTO.getCourse().getId()).isPresent()) {
            List<QuestionDTO> questionDTOS = examDTO.getQuestionList();
            for (QuestionDTO q : questionDTOS) {
                q.setExam(examDTO);
            }
            examRepo.save(new ModelMapper().map(examDTO, Exam.class));
        } else {
            throw new NotFoundException("Id khóa học không hợp lệ");
        }
    }

    @Transactional
    public ExamDTO updateExam(ExamDTO examDTO) throws NotFoundException {
        if (courseRepo.findById(examDTO.getCourse().getId()).isPresent()
                && examRepo.findById(examDTO.getId()).isPresent()) {
            List<QuestionDTO> questionDTOS = examDTO.getQuestionList();
            for (QuestionDTO q : questionDTOS) {
                q.setExam(examDTO);
            }
            examRepo.save(new ModelMapper().map(examDTO, Exam.class));
            return new ModelMapper().map(examRepo.findById(examDTO.getId()),ExamDTO.class);
        } else {
            throw new NotFoundException("Id khóa học hoặc bài kiểm tra không hợp lệ");
        }
    }

    @Transactional
    public void deleteExam(int id) throws NotFoundException {
        if (courseRepo.findById(id).isPresent()) {
            courseRepo.deleteById(id);
        } else {
            throw new NotFoundException("Id bài kiểm tra không hợp lệ");
        }
    }

    //lay ra cho giao vien
    public ExamDTO findById(int id) throws NotFoundException {
        if (examRepo.findById(id).isPresent()) {
            return new ModelMapper().map(examRepo.findById(id), ExamDTO.class);
        } else {
            throw new NotFoundException("Id bài kiểm tra không hợp lệ");
        }
    }

    public List<ExamDTO> findByCourse(int course_id) throws NotFoundException {
        if(courseRepo.findById(course_id).isPresent()) {
            List<ExamDTO> examDTOS = examRepo.findByCourse(course_id).stream().map(this::convert).collect(Collectors.toList());
            return examDTOS;
        }else{
            throw new NotFoundException("Id khoá học không hợp lệ");
        }
    }

    //lay ra bai cho hoc sinh
    public ExamFormDTO findByIdForStudent(int id) throws NotFoundException{
        if (examRepo.findById(id).isPresent()) {
            return new ModelMapper().map(examRepo.findById(id), ExamFormDTO.class);
        } else {
            throw new NotFoundException("Id bài kiểm tra không hợp lệ");
        }
    }

    //cham diem bai lam
    public void addScore(ExamFormDTO examFormDTO) throws NotFoundException, ExpiredDateException {
        Exam exam = examRepo.findById(examFormDTO.getId()).orElse(null);
        if (exam != null) {
            if (exam.getDeadline().after(now())) {
                ScoreExam scoreExam = new ScoreExam();
                scoreExam.setStudent(new ModelMapper().map(examFormDTO.getStudent(), Student.class));

                scoreExam.setExam(exam);
                double count = 0;
                double total = 0;
                for (QuestionDTO q : examFormDTO.getQuestionList()) {
                    if (q.getChosen_answer_id() == Objects.requireNonNull(questionRepo.findById(q.getId()).orElse(null)).getCorrect_answer()) {
                        count += 1;
                    }
                    total += 1;
                }
                scoreExam.setGrade(count * 100 / total);
                scoreExamRepo.save(scoreExam);
            } else {
                throw new ExpiredDateException("Quá thời hạn nộp bài");
            }
        } else {
            throw new NotFoundException("Id của exam không hợp lệ");
        }
    }
}
