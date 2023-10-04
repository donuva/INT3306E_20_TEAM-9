package com.example.backend_lms.service;

import com.example.backend_lms.dto.*;
import com.example.backend_lms.entity.*;
import com.example.backend_lms.repo.*;
import jakarta.transaction.Transactional;
import javassist.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class ScoreService {

    @Autowired
    ScoreExamRepo scoreExamRepo;

    @Autowired
    ScoreExerciseRepo scoreExerciseRepo;

    @Autowired
    CourseRepo courseRepo;

    @Autowired
    ExerciseRepo exerciseRepo;

    @Autowired
    ExamRepo examRepo;
    public Student getStudentEnrolledCourse(int course_id, int student_id) {
        List<Student> students = Objects.requireNonNull(courseRepo.findById(course_id).orElse(null)).getStudentList();
        for (Student student : students) {
            if (student.getId() == student_id) {
                return student;
            }
        }
        return null;
    }

    public ScoreExamDTO convertScoreExam(ScoreExam scoreExam) {
        return new ModelMapper().map(scoreExam, ScoreExamDTO.class);
    }

    public ScoreExerciseDTO convertScoreExercise(ScoreExercise scoreExercise) {
        return new ModelMapper().map(scoreExercise, ScoreExerciseDTO.class);
    }

    //lay ra cho giao vien bang diem theo course
    //cai nay se la show ra page cac courseScoreDTO
    //lay ra hoc sinh -> moi hoc sinh se lay ra CourseScoreDTO
    public List<CourseScoreDTO> getScoreByCourse(int course_id) throws NotFoundException {
        if (courseRepo.findById(course_id).isPresent()) {
            List<Student> students = Objects.requireNonNull(courseRepo.findById(course_id).orElse(null)).getStudentList();
            List<CourseScoreDTO> courseScoreDTOS = new ArrayList<>();
            for(Student s: students){
                courseScoreDTOS.add(getCourseScoreByStudentAndCourse(course_id, s.getId()));
            }
            return courseScoreDTOS;
        }else{
            throw new NotFoundException("Không tìm được course");
        }

    }

    public CourseScoreDTO getCourseScoreByStudentAndCourse(int course_id, int student_id) throws NotFoundException {
        double GPA=0;
        double total =0;
        CourseScoreDTO courseScoreDTO = new CourseScoreDTO();
        if (courseRepo.findById(course_id).isPresent()) {
            Student student = getStudentEnrolledCourse(course_id, student_id);
            if (student != null) {
                courseScoreDTO.setStudentDTO(new ModelMapper().map(student, StudentDTO.class));
                courseScoreDTO.setCourseDTO(new ModelMapper().map(courseRepo.findById(course_id).orElse(null), CourseDTO.class));
                List<ScoreExamDTO> scoreExamDTOS = scoreExamRepo.findByStudentAndCourse(course_id, student_id)
                        .stream().map(this::convertScoreExam).collect(Collectors.toList());
                courseScoreDTO.setScoreExamDTOS(scoreExamDTOS);
                List<ScoreExerciseDTO> scoreExerciseDTOS = scoreExerciseRepo.findByStudentAndCourse(course_id, student_id).stream()
                        .map(this::convertScoreExercise).collect(Collectors.toList());
                courseScoreDTO.setScoreExerciseDTOS(scoreExerciseDTOS);
                for(ScoreExerciseDTO sExercise: scoreExerciseDTOS){
                    GPA += sExercise.getGrade();
                    total += 1;
                }
                for (ScoreExamDTO sExam: scoreExamDTOS){
                    GPA+=sExam.getGrade();
                    total += 1;
                }
                courseScoreDTO.setGPA(GPA/total);
            }else{
                throw new NotFoundException("Không tìm được học sinh");
            }
            return courseScoreDTO;
        }else{
            throw new NotFoundException("Không tìm được khóa học");
        }
    }



    //lay ra bang diem cua hoc sinh theo exam_id, exercise_id
    //cho giao vien
    public PageDTO<List<ScoreExerciseDTO>> getScoreByExercise(int exercise_id, int current_page) throws NotFoundException {
        Sort sortBy = Sort.by("id").ascending();
        PageRequest pageRequest = PageRequest.of(current_page, 40, sortBy);
        if(exerciseRepo.findById(exercise_id).isPresent()) {

            Page<ScoreExercise> page = scoreExerciseRepo.findAllByExerciseId(exercise_id, pageRequest);

            List<ScoreExerciseDTO> scoreExerciseDTOS = page.get().map(this::convertScoreExercise).toList();
            PageDTO<List<ScoreExerciseDTO>> pageDTO = new PageDTO<>();
            pageDTO.setTotalPages(page.getTotalPages());
            pageDTO.setSize(page.getSize());
            pageDTO.setTotalElements(page.getTotalElements());
            pageDTO.setData(scoreExerciseDTOS);
            return pageDTO;
        }else{
            throw new NotFoundException("Exercise_id không hợp lệ");
        }
    }

    public PageDTO<List<ScoreExamDTO>> getScoreByExam(int exam_id, int current_page) throws NotFoundException {
        Sort sortBy = Sort.by("id").ascending();
        PageRequest pageRequest = PageRequest.of(current_page, 40, sortBy);
        if(examRepo.findById(exam_id).isPresent()) {

            Page<ScoreExam> page = scoreExamRepo.findAllByExamId(exam_id, pageRequest);

            List<ScoreExamDTO> scoreExamDTOS = page.get().map(this::convertScoreExam).toList();
            PageDTO<List<ScoreExamDTO>> pageDTO = new PageDTO<>();
            pageDTO.setTotalPages(page.getTotalPages());
            pageDTO.setSize(page.getSize());
            pageDTO.setTotalElements(page.getTotalElements());
            pageDTO.setData(scoreExamDTOS);
            return pageDTO;
        }else{
            throw new NotFoundException("Exam_id không hợp lệ");
        }
    }

    //lay ra diem cua hoc sinh theo exam_id, exercise_id cho hoc sinh

    public ScoreExamDTO getScoreByExamAndStudent(int exam_id, int student_id) throws NotFoundException {
        if(scoreExamRepo.findByStudentAndExam(student_id, exam_id).isPresent()){
            return convertScoreExam(scoreExamRepo.findByStudentAndExam(student_id, exam_id).orElse(null));
        }else{
            throw new NotFoundException("Exam_id hoặc student_id không hợp lệ");
        }
    }

    public ScoreExerciseDTO getScoreByExerciseAndStudent(int exercise_id, int student_id) throws NotFoundException {
        if(scoreExerciseRepo.findByStudentAndExercise(student_id, exercise_id).isPresent()){
            return convertScoreExercise(scoreExerciseRepo.findByStudentAndExercise(student_id, exercise_id).orElse(null));
        }else{
            throw new NotFoundException("Exercise_id hoặc student_id không hợp lệ");
        }
    }
}
