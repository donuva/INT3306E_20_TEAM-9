package com.example.backend_lms.controller;

import com.example.backend_lms.dto.StudentDTO;
import com.example.backend_lms.dto.TeacherDTO;
import com.example.backend_lms.dto.UserDTO;
import com.example.backend_lms.service.StudentService;
import com.example.backend_lms.service.TeacherService;
import com.example.backend_lms.service.UserService;
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
import java.security.Principal;
import java.util.UUID;

@RestController
@CrossOrigin

public class UserController {
    @Autowired
    UserService userService;

    @Autowired
    TeacherService teacherService;

    @Autowired
    StudentService studentService;

    @Autowired
    ValidateRegister validateRegister;

    @Value("${upload.folder}")
    String Upload_Folder;


    @GetMapping("/api/me")
    public UserDTO me(Principal p){
        String username = p.getName();
        return userService.findByUsername(username);
    }

    @GetMapping("/api/student/me")
    public StudentDTO getStudent(Principal p) throws NotFoundException {
        String username = p.getName();

        return studentService.findByUserId(userService.findByUsername(username).getId());
    }


    @GetMapping("/api/teacher/me")
    public TeacherDTO getTeacher(Principal p) throws NotFoundException {
        String username = p.getName();
        return teacherService.findByUserId(userService.findByUsername(username).getId());
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/api/admin/delete-student/{id}")
    public void deleteStudent(@PathVariable("id") int id) throws NotFoundException {
        studentService.delete(id);
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/api/admin/delete-teacher/{id}")
    public void deleteTeacher(@PathVariable("id") int id) throws NotFoundException {
        teacherService.delete(id);
    }
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/api/admin/new")
    public void createAdminAccount(@ModelAttribute UserDTO userDTO, @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        validateRegister.validateEntry(userDTO.getUsername(), userDTO.getPhone(), userDTO.getEmail());

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

    @PutMapping("/api/admin/update")
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

    @PutMapping("/api/user/update")
    public ResponseEntity<UserDTO> updateUser(@ModelAttribute UserDTO userDTO, @RequestPart(value = "file", required = false) MultipartFile file) throws IOException, NotFoundException {
        if(file != null){
            String filename = file.getOriginalFilename();
            assert filename != null;
            String extension = filename.substring(filename.lastIndexOf("."));
            String newFilename ="avatar" + UUID.randomUUID() + extension;

            File saveFile = new File(Upload_Folder + newFilename);

            file.transferTo(saveFile);
            userDTO.setAva_url(newFilename); //luu file xuong db
        }

        return ResponseEntity.ok()
                .body(userService.updateUser(userDTO));
    }

    @GetMapping("/api/getUser/{id}")
    public ResponseEntity<UserDTO> findUser(@PathVariable("id")int id) throws NotFoundException {
        return ResponseEntity.ok(userService.findById(id));
    }


    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/api/admin/delete/{id}")
    public void deleteAdminAccount(@PathVariable("id") int id) throws NotFoundException {
        userService.deleteAdmin(id);
    }


}
