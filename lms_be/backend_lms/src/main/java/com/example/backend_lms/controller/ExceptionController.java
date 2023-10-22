package com.example.backend_lms.controller;

import com.example.backend_lms.exception.ExpiredDateException;
import com.example.backend_lms.exception.NotAllowedException;
import javassist.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class ExceptionController{
    @ExceptionHandler({NotFoundException.class})
    public ResponseEntity<Object> notFound(NotFoundException e){

        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({ExpiredDateException.class})
    public ResponseEntity<Object> expired(ExpiredDateException e){
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
    }

    @ExceptionHandler({NotAllowedException.class})
    public ResponseEntity<Object> notAllow(NotAllowedException e){
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
    }

    @ExceptionHandler({AuthenticationException.class})
    public ResponseEntity<Object> authError(AuthenticationException e){
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<Object> unknown(Exception e){
        return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}