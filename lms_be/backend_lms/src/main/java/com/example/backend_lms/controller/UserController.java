package com.example.backend_lms.controller;

import com.example.backend_lms.dto.UserDTO;
import com.example.backend_lms.service.UserService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.security.Principal;
import java.util.UUID;

@RestController
public class UserController {
    @Autowired
    UserService userService;

    @Value("${upload.folder}")
    String Upload_Folder;


    @GetMapping("/me")
    public UserDTO me(Principal p){
        String username = p.getName();
        return userService.findByUsername(username);
    }


    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/admin/new")
    public void createAdminAccount(@ModelAttribute UserDTO userDTO) throws IOException {
        if(!userDTO.getFile().isEmpty()){
            String filename = userDTO.getFile().getOriginalFilename();
            assert filename != null;
            String extension = filename.substring(filename.lastIndexOf("."));
            String newFilename ="avatar_admin" + UUID.randomUUID() + extension;

            File saveFile = new File(Upload_Folder + newFilename);

            userDTO.getFile().transferTo(saveFile);
            userDTO.setAva_url(newFilename); //luu file xuong db
        }
        userService.createAdmin(userDTO);

    }

    @PutMapping("/admin/update")
    public ResponseEntity<UserDTO> updateAdminAccount(@ModelAttribute UserDTO userDTO) throws NotFoundException, IOException {
        if(!userDTO.getFile().isEmpty()){
            String filename = userDTO.getFile().getOriginalFilename();
            assert filename != null;
            String extension = filename.substring(filename.lastIndexOf("."));
            String newFilename ="avatar_admin" + UUID.randomUUID() + extension;

            File saveFile = new File(Upload_Folder + newFilename);

            userDTO.getFile().transferTo(saveFile);
            userDTO.setAva_url(newFilename); //luu file xuong db
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
