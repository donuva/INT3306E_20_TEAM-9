package com.example.backend_lms.controller;

import com.example.backend_lms.dto.*;
import com.example.backend_lms.service.ExerciseService;
import com.example.backend_lms.service.ScoreService;
import com.example.backend_lms.service.StudentService;
import com.example.backend_lms.service.UserService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")

public class ScoreController {

    @Autowired
    ScoreService scoreService;

    @Autowired
    UserService userService;

    @Autowired
    StudentService studentService;

    @Autowired
    ExerciseService exerciseService;

    //hiển thị bang điểm theo course cho giáo viên
    @GetMapping("/teacher/getCourseScore/{id}")
    public ResponseEntity<List<CourseScoreDTO>> getScoreByCourse(@PathVariable("id") int course_id) throws NotFoundException {
        return ResponseEntity.ok(scoreService.getScoreByCourse(course_id));
    }

    //hien thi bang diem theo course cua tung hoc sinh cho giao vien
    @GetMapping("/teacher/getCourseScoreByStudent")
    public ResponseEntity<CourseScoreDTO> getCourseScoreByStudentAndCourse(@RequestParam("course_id")  int course_id,
                                                                           @RequestParam("student_id") int student_id) throws NotFoundException {
        return ResponseEntity.ok(scoreService.getCourseScoreByStudentAndCourse(course_id,
                student_id));
    }


    // hiển thị điểm theo course cho học sinh
    @GetMapping("/student/getCourseScore/{course_id}")
    public ResponseEntity<CourseScoreDTO> getCourseScoreByStudentAndCourse(@PathVariable("course_id") int course_id,
                                                                           Principal p) throws NotFoundException {
        String username = p.getName();
        UserDTO userDTO = userService.findByUsername(username);
        StudentDTO studentDTO = studentService.findByUserId(userDTO.getId());
        System.out.println(studentDTO.getId());
        return ResponseEntity.ok(scoreService.getCourseScoreByStudentAndCourse(course_id, studentDTO.getId()));
    }

    //lay list diem theo tung bai, lay tu day ra roi lay theo id de cham tung bai
    @GetMapping("/teacher/getScoreByExercise")
    public ResponseEntity<PageDTO<List<ScoreExerciseDTO>>> getScoreByExercise(@RequestParam("exercise_id") int exercise_id,
                                                                              @RequestParam(value = "current_page", required = false) Integer current_page) throws NotFoundException {
        if(current_page==null){
            current_page=0;
        }
        return ResponseEntity.ok(scoreService.getScoreByExercise(exercise_id, current_page));
    }


    //lay TUNG BAI cua ban than (dung principle)
    @GetMapping("/student/getExerciseScore/{exercise_id}")
    public ResponseEntity<ScoreExerciseDTO> getExerciseScoreByStudent(@RequestParam("exercise_id") int exercise_id, Principal p) throws NotFoundException {
        String username = p.getName();
        UserDTO userDTO = userService.findByUsername(username);
        StudentDTO studentDTO = studentService.findByUserId(userDTO.getId());
        return ResponseEntity.ok(scoreService.getScoreByExerciseAndStudent(exercise_id, studentDTO.getId()));
    }


    //lấy bài làm để chấm từ đây, cũng có thể xem điểm của học sinh từ đây
    @GetMapping("/teacher/exercise/getWork/{scoreExerciseId}")
    public ResponseEntity<ScoreExerciseDTO> getExerciseWork(@PathVariable("scoreExerciseId") int scoreExerciseId) throws NotFoundException {
        return ResponseEntity.ok(scoreService.getScoreExerciseById(scoreExerciseId));
    }

    @PostMapping("/teacher/exercise/addScore/{scoreExerciseId}")
    public void addScore(@PathVariable("scoreExerciseId") int scoreExerciseId,
                         @RequestParam("grade") Double grade) throws NotFoundException {
        exerciseService.addScore(scoreExerciseId, grade);
    }

    @DeleteMapping("/teacher/exercise/deleteScore/{scoreExerciseId}")
    public void deleteScore(@PathVariable("scoreExerciseId") int scoreExerciseId) throws NotFoundException {
        exerciseService.deleteScore(scoreExerciseId);
    }

}
