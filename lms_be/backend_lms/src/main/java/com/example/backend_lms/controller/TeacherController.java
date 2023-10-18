package com.example.backend_lms.controller;

import com.example.backend_lms.dto.PageDTO;
import com.example.backend_lms.dto.TeacherDTO;
import com.example.backend_lms.dto.search.SearchTeacherDTO;
import com.example.backend_lms.service.TeacherService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
public class TeacherController {

    @Value("${upload.folder}")
    String Upload_Folder;

    @Autowired
    TeacherService teacherService;

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/teacher/create")
    public void createTeacher(@ModelAttribute TeacherDTO teacherDTO) throws IOException {

        if (!teacherDTO.getUser().getFile().isEmpty()) {
            String filename = teacherDTO.getUser().getFile().getOriginalFilename();
            assert filename != null;
            String extension = filename.substring(filename.lastIndexOf("."));
            String newFilename = "avatar_teacher" + UUID.randomUUID() + extension;

            File saveFile = new File(Upload_Folder + newFilename);

            teacherDTO.getUser().getFile().transferTo(saveFile);
            teacherDTO.getUser().setAva_url(newFilename); //luu file xuong db
        }
        teacherService.create(teacherDTO);
    }

    @PutMapping("/teacher/update")
    public ResponseEntity<TeacherDTO> updateTeacher(@ModelAttribute TeacherDTO teacherDTO) throws IOException, NotFoundException {

        if (!teacherDTO.getUser().getFile().isEmpty()) {
            String filename = teacherDTO.getUser().getFile().getOriginalFilename();

            assert filename != null;
            String extension = filename.substring(filename.lastIndexOf("."));
            String newFilename = "avatar_teacher" + UUID.randomUUID() + extension;

            File saveFile = new File(Upload_Folder + newFilename);

            teacherDTO.getUser().getFile().transferTo(saveFile);
            teacherDTO.getUser().setAva_url(newFilename); //luu file xuong db
        }

        return ResponseEntity.ok(teacherService.update(teacherDTO));
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("teacher/delete/{id}")
    public void deleteTeacher(@PathVariable("id") int id) throws NotFoundException {
        teacherService.delete(id);
    }

    @GetMapping("/getTeacher/{id}")
    public ResponseEntity<TeacherDTO> findTeacher(@PathVariable("id")int id) throws NotFoundException {
        return ResponseEntity.ok(teacherService.findById(id));
    }

    @GetMapping("/searchTeacher")
    public ResponseEntity<PageDTO<List<TeacherDTO>>>searchTeacher(@RequestParam("name") String name, @RequestParam("page") int current_page){
        return ResponseEntity.ok(teacherService.search(name, current_page));
    }


}
