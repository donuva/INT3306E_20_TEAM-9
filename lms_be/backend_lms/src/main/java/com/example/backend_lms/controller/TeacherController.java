package com.example.backend_lms.controller;

import com.example.backend_lms.dto.PageDTO;
import com.example.backend_lms.dto.TeacherDTO;
import com.example.backend_lms.service.TeacherService;
import com.example.backend_lms.validator.ValidateRegister;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

public class TeacherController {

    @Value("${upload.folder}")
    String Upload_Folder;

    @Autowired
    TeacherService teacherService;

    @Autowired
    ValidateRegister validateRegister;

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/create/teacher")
    public void createTeacher(@ModelAttribute TeacherDTO teacherDTO, @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {

        validateRegister.validateEntry(teacherDTO.getUser().getUsername(),teacherDTO.getUser().getPhone(), teacherDTO.getUser().getEmail());

        if (file!=null) {
            String filename = file.getOriginalFilename();
            assert filename != null;
            String extension = filename.substring(filename.lastIndexOf("."));
            String newFilename = "avatar_teacher" + UUID.randomUUID() + extension;

            File saveFile = new File(Upload_Folder + newFilename);

            file.transferTo(saveFile);
            teacherDTO.getUser().setAva_url(newFilename); //luu file xuong db
        }else{
            teacherDTO.getUser().setAva_url(null);
        }
        teacherDTO.getUser().setRole("TEACHER");
        teacherService.create(teacherDTO);
    }

    @PutMapping("/teacher/update")
    public ResponseEntity<TeacherDTO> updateTeacher(@ModelAttribute TeacherDTO teacherDTO, @RequestPart(value = "file", required = false) MultipartFile file) throws IOException, NotFoundException {
        validateRegister.validateEntry(teacherDTO.getUser().getUsername(),teacherDTO.getUser().getPhone(), teacherDTO.getUser().getEmail());

        if (file!=null) {
            String filename = file.getOriginalFilename();

            assert filename != null;
            String extension = filename.substring(filename.lastIndexOf("."));
            String newFilename = "avatar_teacher" + UUID.randomUUID() + extension;

            File saveFile = new File(Upload_Folder + newFilename);

            file.transferTo(saveFile);
            teacherDTO.getUser().setAva_url(newFilename); //luu file xuong db
        }
        teacherDTO.getUser().setRole("TEACHER");
        return ResponseEntity.ok(teacherService.update(teacherDTO));
    }



    @GetMapping("/getTeacher/{id}")
    public ResponseEntity<TeacherDTO> findTeacher(@PathVariable("id")int id) throws NotFoundException {
        return ResponseEntity.ok(teacherService.findById(id));
    }

    @GetMapping("/searchTeacher")
    public ResponseEntity<PageDTO<List<TeacherDTO>>>searchTeacher(@RequestParam( name ="name", required=false) String name, @RequestParam("current_page") Integer current_page){
        if(current_page==null){
            current_page=0;
        }
        return ResponseEntity.ok(teacherService.search(name, current_page));
    }


}
