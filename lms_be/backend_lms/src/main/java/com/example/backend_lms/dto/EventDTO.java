package com.example.backend_lms.dto;

import lombok.Data;

import java.util.Date;

@Data
public class EventDTO {
    private int id;
    private String type;
    private String title;
    private Date date;
}
