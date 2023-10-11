package com.example.backend_lms.controller;

import com.example.backend_lms.dto.CourseDTO;
import com.example.backend_lms.dto.LessonDTO;
import com.example.backend_lms.service.LessonService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@RestController
public class LessonController {
    //TODO: CRUD lesson controller
    //TODO: findById
    //TODO: dẫn link

    @Autowired
    LessonService lessonService;

    @Value("${upload.folder}")
    String Upload_Folder;

    @GetMapping("/course/lesson/{id}")
    public LessonDTO getLesson(@PathVariable("id") int id) throws NotFoundException {
        return lessonService.getById(id);
    }

    @PostMapping("/teacher/course/lesson")
    @ResponseStatus(HttpStatus.OK)
    public void createLesson(@ModelAttribute LessonDTO lessonDTO) throws IOException {
        if (!lessonDTO.getFile().isEmpty()) {
            String filename = lessonDTO.getFile().getOriginalFilename();
            assert filename != null;
            String extension = filename.substring(filename.lastIndexOf("."));
            String newFilename = "url_lesson" + UUID.randomUUID() + extension;

            File saveFile = new File(Upload_Folder + newFilename);

            lessonDTO.getFile().transferTo(saveFile);
            lessonDTO.setUrl(newFilename); //luu file xuong db
        }
        lessonService.create(lessonDTO);
    }

    @DeleteMapping("/teacher/course/lesson")
    @ResponseStatus(HttpStatus.OK)
    public void deleteLesson(@RequestParam("id") int id) throws NotFoundException {
        lessonService.delete(id);
    }

    @PutMapping("/teacher/course/lesson")
    @ResponseStatus(HttpStatus.OK)
    public LessonDTO updateLesson(@ModelAttribute LessonDTO lessonDTO) throws NotFoundException, IOException {
        if (!lessonDTO.getFile().isEmpty()) {
            String filename = lessonDTO.getFile().getOriginalFilename();
            assert filename != null;
            String extension = filename.substring(filename.lastIndexOf("."));
            String newFilename = "url_lesson" + UUID.randomUUID() + extension;

            File saveFile = new File(Upload_Folder + newFilename);

            lessonDTO.getFile().transferTo(saveFile);
            lessonDTO.setUrl(newFilename); //luu file xuong db
        }
        return lessonService.update(lessonDTO);
    }


}