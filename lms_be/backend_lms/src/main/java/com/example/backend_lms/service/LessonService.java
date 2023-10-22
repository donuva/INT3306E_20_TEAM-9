package com.example.backend_lms.service;

import com.example.backend_lms.dto.LessonDTO;
import com.example.backend_lms.entity.Lesson;
import com.example.backend_lms.repo.CourseRepo;
import com.example.backend_lms.repo.LessonRepo;
import javassist.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LessonService {

    @Autowired
    LessonRepo lessonRepo;

    @Autowired
    CourseRepo courseRepo;
    public LessonDTO convert(Lesson lesson) {
        return new ModelMapper().map(lesson, LessonDTO.class);
    }

    public void create(LessonDTO lessonDTO) {
        lessonRepo.save(new ModelMapper().map(lessonDTO, Lesson.class));
    }

    public void delete(int id) throws NotFoundException {
        if (lessonRepo.findById(id).isPresent()) {
            lessonRepo.deleteById(id);
        } else {
            throw new NotFoundException("Không tìm thấy lesson");
        }
    }

    public LessonDTO update(LessonDTO lessonDTO) throws NotFoundException {
        LessonDTO current_lesson = convert(lessonRepo.findById(lessonDTO.getId()).orElse(null));
        if (current_lesson!= null) {
            if(lessonDTO.getUrl()==null){
                lessonDTO.setUrl(current_lesson.getUrl());
            }
            lessonDTO.setCourse(current_lesson.getCourse());
            lessonRepo.save(new ModelMapper().map(lessonDTO, Lesson.class));
            return convert(lessonRepo.findById(lessonDTO.getId()).orElse(null));
        } else {
            throw new NotFoundException("Không tìm thấy lesson");
        }
    }

    public LessonDTO getById(int id) throws NotFoundException {
        if (lessonRepo.findById(id).isPresent()) {
            return convert(lessonRepo.findById(id).orElse(null));
        } else {
            throw new NotFoundException("Không tìm thấy lesson");
        }
    }

    public List<LessonDTO> getByCourse(int course_id) throws NotFoundException {
        if (courseRepo.findById(course_id).isPresent()) {
            return lessonRepo.findByCourse(course_id).stream().map(this::convert).toList();
        }else{
            throw new NotFoundException("Không tìm thấy course");
        }
    }
}
