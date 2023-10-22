package com.example.backend_lms.exception;

public class DuplicateKeyException extends Exception{
    public DuplicateKeyException(String msg){
        super(msg);
    }
}
