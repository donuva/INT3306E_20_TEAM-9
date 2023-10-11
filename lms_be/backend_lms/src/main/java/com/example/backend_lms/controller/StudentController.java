package com.example.backend_lms.controller;


import com.example.backend_lms.dto.PageDTO;
import com.example.backend_lms.dto.StudentDTO;
import com.example.backend_lms.dto.TeacherDTO;
import com.example.backend_lms.dto.search.SearchStudentDTO;
import com.example.backend_lms.service.StudentService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestControllerAdvice
public class StudentController {
    @Value("${upload.folder}")
    String Upload_Folder;

    @Autowired
    StudentService studentService;

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/student/create")
    public void createStudent(@ModelAttribute StudentDTO studentDTO) throws IOException {

        if (!studentDTO.getUser().getFile().isEmpty()) {
            String filename = studentDTO.getUser().getFile().getOriginalFilename();
            assert filename != null;
            String extension = filename.substring(filename.lastIndexOf("."));
            String newFilename = "avatar_student" + UUID.randomUUID() + extension;

            File saveFile = new File(Upload_Folder + newFilename);

            studentDTO.getUser().getFile().transferTo(saveFile);
            studentDTO.getUser().setAva_url(newFilename); //luu file xuong db
        }
        studentService.create(studentDTO);
    }

    @PutMapping("/student/update")
    public ResponseEntity<StudentDTO> updateStudent(@ModelAttribute StudentDTO studentDTO) throws IOException, NotFoundException {

        if (!studentDTO.getUser().getFile().isEmpty()) {
            String filename = studentDTO.getUser().getFile().getOriginalFilename();

            assert filename != null;
            String extension = filename.substring(filename.lastIndexOf("."));
            String newFilename = "avatar_student" + UUID.randomUUID() + extension;

            File saveFile = new File(Upload_Folder + newFilename);

            studentDTO.getUser().getFile().transferTo(saveFile);
            studentDTO.getUser().setAva_url(newFilename); //luu file xuong db
        }

        return ResponseEntity.ok(studentService.update(studentDTO));
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("student/delete/{id}")
    public void deleteStudent(@PathVariable("id") int id) throws NotFoundException {
        studentService.delete(id);
    }

    @GetMapping("/getStudent/{id}")
    public ResponseEntity<StudentDTO> findStudent(@PathVariable("id")int id) throws NotFoundException {
        return ResponseEntity.ok(studentService.findById(id));
    }

    @GetMapping("/searchStudent")
    public ResponseEntity<PageDTO<List<StudentDTO>>> searchStudent(@RequestBody SearchStudentDTO searchStudentDTO){
        return ResponseEntity.ok(studentService.search(searchStudentDTO));
    }
}