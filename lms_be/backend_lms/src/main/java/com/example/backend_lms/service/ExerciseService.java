package com.example.backend_lms.service;

import com.example.backend_lms.dto.ExerciseDTO;
import com.example.backend_lms.dto.StudentDTO;
import com.example.backend_lms.entity.Exercise;
import com.example.backend_lms.repo.CourseRepo;
import com.example.backend_lms.repo.ExerciseRepo;
import jakarta.transaction.Transactional;
import javassist.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExerciseService {
    //TODO: cham diem exercise

    @Autowired
    ExerciseRepo exerciseRepo;

    @Autowired
    CourseRepo courseRepo;

    public ExerciseDTO convert(Exercise exercise){
        return new ModelMapper().map(exercise, ExerciseDTO.class);
    }

    @Transactional
    public void create(ExerciseDTO exerciseDTO) throws NotFoundException {
        if(courseRepo.findById(exerciseDTO.getCourse().getId()).isPresent()) {
            new ModelMapper().map(exerciseDTO, Exercise.class);
        }else{
            throw new NotFoundException("Không tìm thấy course");
        }
    }

    @Transactional
    public ExerciseDTO update(Exercise exerciseDTO) throws NotFoundException {
        if(exerciseRepo.findById(exerciseDTO.getId()).isPresent()) {
            new ModelMapper().map(exerciseDTO, Exercise.class);
            return new ModelMapper().map(exerciseRepo.findById(exerciseDTO.getId()),ExerciseDTO.class);
        }else{
            throw new NotFoundException("Không tìm thấy bài tập");
        }
    }

    @Transactional
    public void delete(int id) throws NotFoundException {
        if(exerciseRepo.findById(id).isPresent()){
            exerciseRepo.deleteById(id);
        }else{
            throw new NotFoundException("Không tìm thấy bài tập");
        }
    }

    public List<ExerciseDTO> getExerciseByCourse(int course_id){
        return exerciseRepo.findByCourseId(course_id).stream().map(this::convert).collect(Collectors.toList());
    }

    public ExerciseDTO findById(int id) throws NotFoundException {
        if (exerciseRepo.findById(id).isPresent()) {
            return convert(exerciseRepo.findById(id).orElse(null));
        }else{
            throw new NotFoundException("Không tìm thấy bài tập");
        }
    }


}
