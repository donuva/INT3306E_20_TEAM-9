package com.example.backend_lms.controller;

import com.example.backend_lms.dto.LessonDTO;
import com.example.backend_lms.service.LessonService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@RestController
@CrossOrigin

public class LessonController {


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
    public void createLesson(@ModelAttribute LessonDTO lessonDTO, @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        if (file!=null) {
            String filename = file.getOriginalFilename();
            assert filename != null;
            String extension = filename.substring(filename.lastIndexOf("."));
            String newFilename = "url_lesson" + UUID.randomUUID() + extension;

            File saveFile = new File(Upload_Folder + newFilename);

            file.transferTo(saveFile);
            lessonDTO.setUrl(newFilename); //luu file xuong db
        }
        else{
            lessonDTO.setUrl(null);
        }
        lessonService.create(lessonDTO);
    }

    @DeleteMapping("/teacher/course/lesson/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteLesson(@PathVariable("id") int id) throws NotFoundException {
        lessonService.delete(id);
    }

    @PutMapping("/teacher/course/lesson")
    @ResponseStatus(HttpStatus.OK)
    public LessonDTO updateLesson(@ModelAttribute LessonDTO lessonDTO, @RequestPart(value = "file", required = false) MultipartFile file) throws NotFoundException, IOException {
        if (file!=null) {
            String filename = file.getOriginalFilename();
            assert filename != null;
            String extension = filename.substring(filename.lastIndexOf("."));
            String newFilename = "url_lesson" + UUID.randomUUID() + extension;

            File saveFile = new File(Upload_Folder + newFilename);

            file.transferTo(saveFile);
            lessonDTO.setUrl(newFilename); //luu file xuong db
        }
        return lessonService.update(lessonDTO);
    }


}
