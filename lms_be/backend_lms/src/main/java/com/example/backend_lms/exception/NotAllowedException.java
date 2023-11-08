package com.example.backend_lms.exception;

public class NotAllowedException extends RuntimeException {
    public NotAllowedException(String s){
        super(s);
    }
}
