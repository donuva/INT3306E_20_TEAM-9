package com.example.backend_lms.dto;

import lombok.Data;

@Data
public class SearchDTO {
        private Integer currentPage;
        private Integer size;
        private String sortedField;
}
