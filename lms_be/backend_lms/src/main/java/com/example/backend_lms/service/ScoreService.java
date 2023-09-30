package com.example.backend_lms.service;

import com.example.backend_lms.dto.CourseScoreDTO;
import com.example.backend_lms.dto.PageDTO;
import com.example.backend_lms.dto.ScoreExamDTO;
import com.example.backend_lms.dto.ScoreExerciseDTO;
import com.example.backend_lms.entity.Course;
import com.example.backend_lms.entity.ScoreExam;
import com.example.backend_lms.repo.CourseRepo;
import com.example.backend_lms.repo.ScoreExamRepo;
import com.example.backend_lms.repo.ScoreExerciseRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import java.util.List;

@Service
public class ScoreService {
    //TODO: show bang diem cua hoc sinh (cho giao vien)
    //TODO: show bang diem cho hoc sinh

    @Autowired
    ScoreExamRepo scoreExamRepo;

    @Autowired
    ScoreExerciseRepo scoreExerciseRepo;

    @Autowired
    CourseRepo courseRepo;

    public ScoreExamDTO convertScoreExam(ScoreExam scoreExam){
        return new ModelMapper().map(scoreExam, ScoreExamDTO.class);
    }

    //lay ra cho giao vien bang diem theo course
    //cai nay se la show ra page cac courseScoreDTO
    //lay ra hoc sinh -> moi hoc sinh se lay ra CourseScoreDTO
    public List<CourseScoreDTO> getScoreByCourse(int course_id){
        CourseScoreDTO courseScoreDTO = new CourseScoreDTO();
        if(courseRepo.findById(course_id).isPresent()){
            courseScoreDTO.setScoreExamDTOS(scoreExamRepo.findById() );
        }
    }

    public List<CourseScoreDTO> getCourseScoreByStudentAndCourse(int course_id, int student_id){

    }

        //lay ra bang diem theo course va hoc sinh (cho giao vien va hoc sinh)

    //lay ra bang diem cua hoc sinh theo exam_id, exercise_id
    //cho giao vien
    public PageDTO<List<ScoreExerciseDTO>> getScoreByExercise(int exercise_id){

    }

    public PageDTO<List<ScoreExamDTO>> getScoreByExam(int exam_id){

    }

    //lay ra diem cua hoc sinh theo exam_id, exercise_id

    public ScoreExamDTO getScoreByExamAndStudent(int exam_id, int student_id){

    }

    public ScoreExerciseDTO getScoreByExerciseAndStudent(int exercise_id, int student_id){

    }
}
