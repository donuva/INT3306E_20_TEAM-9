package com.example.backend_lms.controller;


import com.example.backend_lms.dto.PageDTO;
import com.example.backend_lms.dto.StudentDTO;
import com.example.backend_lms.dto.TeacherDTO;
import com.example.backend_lms.service.StudentService;
import com.example.backend_lms.validator.ValidateRegister;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*")

public class StudentController {
    @Value("${upload.folder}")
    String Upload_Folder;

    @Autowired
    StudentService studentService;

    @Autowired
    ValidateRegister validateRegister;

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/create/student")
    public void createStudent(@ModelAttribute StudentDTO studentDTO, @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        validateRegister.validateEntry(studentDTO.getUser().getUsername(),studentDTO.getUser().getPhone(), studentDTO.getUser().getEmail());

        if (file!=null) {
            String filename = file.getOriginalFilename();
            assert filename != null;
            String extension = filename.substring(filename.lastIndexOf("."));
            String newFilename = "avatar_student" + UUID.randomUUID() + extension;

            File saveFile = new File(Upload_Folder + newFilename);

            file.transferTo(saveFile);
            studentDTO.getUser().setAva_url(newFilename); //luu file xuong db
        }
        else{
            studentDTO.getUser().setAva_url(null);
        }
        studentService.create(studentDTO);
    }

    @PutMapping("/student/update")
    public ResponseEntity<StudentDTO> updateStudent(@ModelAttribute StudentDTO studentDTO, @RequestPart(value = "file", required = false) MultipartFile file) throws IOException, NotFoundException {

        if (file != null) {
            String filename = file.getOriginalFilename();

            assert filename != null;
            String extension = filename.substring(filename.lastIndexOf("."));
            String newFilename = "avatar_student" + UUID.randomUUID() + extension;

            File saveFile = new File(Upload_Folder + newFilename);

            file.transferTo(saveFile);
            studentDTO.getUser().setAva_url(newFilename); //luu file xuong db
        }

        return ResponseEntity.ok(studentService.update(studentDTO));
    }



    @GetMapping("/getStudent/{id}")
    public ResponseEntity<StudentDTO> findStudent(@PathVariable("id")int id) throws NotFoundException {
        return ResponseEntity.ok(studentService.findById(id));
    }

    @GetMapping("/searchStudent")
    public ResponseEntity<PageDTO<List<StudentDTO>>> searchStudent(@RequestParam( name ="name", required=false) String name, @RequestParam("current_page") Integer current_page){
        if(current_page==null){
            current_page=0;
        }
        return ResponseEntity.ok(studentService.search(name, current_page));
    }
}
