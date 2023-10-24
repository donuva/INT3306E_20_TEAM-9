package com.example.backend_lms.controller;

import com.example.backend_lms.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@CrossOrigin(origins = "*")

public class LoginController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<String> login(
            @RequestParam("username") String username,
            @RequestParam("password") String password){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username,password));
        return ResponseEntity.ok(jwtService.createToken(username));
    }

    @PostMapping("/renewJwt")
    public ResponseEntity<String> login(Principal p){
        return ResponseEntity.ok(jwtService.createToken(p.getName()));
    }
}
