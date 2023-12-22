package com.example.backend_lms.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class CalendarDTO {
    List<EventDTO> events = new ArrayList<>();
}
