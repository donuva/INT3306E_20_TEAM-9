package com.example.backend_lms.controller;

import com.example.backend_lms.dto.StudentDTO;
import com.example.backend_lms.dto.TeacherDTO;
import com.example.backend_lms.dto.UserDTO;
import com.example.backend_lms.service.StudentService;
import com.example.backend_lms.service.TeacherService;
import com.example.backend_lms.service.UserService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.security.Principal;
import java.util.UUID;

@RestController
public class UserController {
    @Autowired
    UserService userService;

    @Autowired
    TeacherService teacherService;

    @Autowired
    StudentService studentService;

    @Value("${upload.folder}")
    String Upload_Folder;


    @GetMapping("/me")
    public UserDTO me(Principal p){
        String username = p.getName();
        return userService.findByUsername(username);
    }

    @GetMapping("/student/me")
    public StudentDTO getStudent(Principal p) throws NotFoundException {
        String username = p.getName();

        return studentService.findByUserId(userService.findByUsername(username).getId());
    }


    @GetMapping("/teacher/me")
    public TeacherDTO getTeacher(Principal p) throws NotFoundException {
        String username = p.getName();
        return teacherService.findByUserId(userService.findByUsername(username).getId());
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/admin/delete-student/{id}")
    public void deleteStudent(@PathVariable("id") int id) throws NotFoundException {
        studentService.delete(id);
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/admin/delete-teacher/{id}")
    public void deleteTeacher(@PathVariable("id") int id) throws NotFoundException {
        teacherService.delete(id);
    }
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/admin/new")
    public void createAdminAccount(@ModelAttribute UserDTO userDTO, @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        if(file!=null){
            String filename = file.getOriginalFilename();
            assert filename != null;
            String extension = filename.substring(filename.lastIndexOf("."));
            String newFilename ="avatar_admin" + UUID.randomUUID() + extension;

            File saveFile = new File(Upload_Folder + newFilename);

            file.transferTo(saveFile);
            userDTO.setAva_url(newFilename); //luu file xuong db
        }else{
            userDTO.setAva_url(null);
        }
        userService.createAdmin(userDTO);

    }

    @PutMapping("/admin/update")
    public ResponseEntity<UserDTO> updateAdminAccount(@ModelAttribute UserDTO userDTO, @RequestPart(value = "file", required = false) MultipartFile file) throws NotFoundException, IOException {
        if(file != null){
            String filename = file.getOriginalFilename();
            assert filename != null;
            String extension = filename.substring(filename.lastIndexOf("."));
            String newFilename ="avatar_admin" + UUID.randomUUID() + extension;

            File saveFile = new File(Upload_Folder + newFilename);

            file.transferTo(saveFile);
            userDTO.setAva_url(newFilename); //luu file xuong db
        }else{
            userDTO.setAva_url(null);
        }

        return ResponseEntity.ok()
                .body(userService.updateAdmin(userDTO));
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/admin/delete/{id}")
    public void deleteAdminAccount(@PathVariable("id") int id) throws NotFoundException {
        userService.deleteAdmin(id);
    }


}
