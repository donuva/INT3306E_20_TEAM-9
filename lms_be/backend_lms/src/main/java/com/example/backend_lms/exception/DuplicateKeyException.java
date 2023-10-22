package com.example.backend_lms.exception;

public class DuplicateKeyException extends RuntimeException{
    public DuplicateKeyException(String msg){
        super(msg);
    }
}
