package com.example.backend_lms.service;

import com.example.backend_lms.dto.CourseDTO;
import com.example.backend_lms.dto.PageDTO;
import com.example.backend_lms.entity.Course;
import com.example.backend_lms.repo.CourseRepo;
import jakarta.transaction.Transactional;
import javassist.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CourseService {
    //TODO CRUD course
    //TODO tao request-> add hoc sinh vao course

    //TODO xoa hoc sinh khoi course
    //TODO cho phep roi khoi course
    @Autowired
    CourseRepo courseRepo;



    public CourseDTO convert(Course course){
        return new ModelMapper().map(course, CourseDTO.class);
    }

    @Transactional
    public void create(CourseDTO courseDTO){
        courseRepo.save(new ModelMapper().map(courseDTO, Course.class));
    }

    @Transactional
    public void delete(int id) throws NotFoundException {
        if(courseRepo.findById(id).isPresent()){
            courseRepo.deleteById(id);
        }else{
            throw new NotFoundException("Không tìm thấy khóa học");
        }
    }

    @Transactional
    public CourseDTO update(CourseDTO courseDTO) throws NotFoundException {
        CourseDTO current_course = convert(courseRepo.findById(courseDTO.getId()).orElse(null));
        if(courseRepo.findById(courseDTO.getId()).isPresent()){
            if(courseDTO.getExamList()==null){
                courseDTO.setExamList(current_course.getExamList());
            }
            if(courseDTO.getExerciseList()==null){
                courseDTO.setExerciseList(current_course.getExerciseList());
            }
            if(courseDTO.getLessonList()==null){
                courseDTO.setLessonList(current_course.getLessonList());
            }
            courseRepo.save(new ModelMapper().map(courseDTO, Course.class));
            return new ModelMapper().map(courseRepo.findById(courseDTO.getId()), CourseDTO.class);
        }else{
            throw new NotFoundException("Không tìm được khóa học");
        }
    }

    public CourseDTO getById(int course_id) throws NotFoundException {
        if(courseRepo.findById(course_id).isPresent()){
            return new ModelMapper().map(courseRepo.findById(course_id),CourseDTO.class);
        }else{
            throw new NotFoundException("Không tìm thấy course");
        }
    }

//    public PageDTO<List<CourseDTO>> getCoursePageByStudent(int student_id){
//
//    }
//
//    public PageDTO<List<CourseDTO>> getCoursePageByTeacher(int teacher_id){
//
//    }
    
}
