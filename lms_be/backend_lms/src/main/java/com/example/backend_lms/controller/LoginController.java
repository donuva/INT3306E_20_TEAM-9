package com.example.backend_lms.controller;

import com.example.backend_lms.entity.User;
import com.example.backend_lms.service.JwtService;
import com.example.backend_lms.service.UserService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@CrossOrigin
public class LoginController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtService jwtService;

    @Autowired
    UserService userService;
    @PostMapping("/api/login")
    public ResponseEntity<String> login(
            @RequestParam("username") String username,
            @RequestParam("password") String password){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username,password));
        return ResponseEntity.ok(jwtService.createToken(username));
    }

    @PostMapping("/api/renewJwt")
    public ResponseEntity<String> login(Principal p){
        return ResponseEntity.ok(jwtService.createToken(p.getName()));
    }

    @GetMapping("/api/resetPassword")
    public ResponseEntity<String> resetPassword(@RequestParam("username") String username){
        userService.resetPassword(username);
        return ResponseEntity.ok("Check your email");
    }

    @PostMapping("/api/resetPassword")
    public ResponseEntity<String> resetPassword(
                                                @RequestParam("token") String token,
                                                @RequestParam("password") String password) throws NotFoundException {
        userService.updatePassword(password,token);
        return ResponseEntity.ok("Password changed");
    }
}
