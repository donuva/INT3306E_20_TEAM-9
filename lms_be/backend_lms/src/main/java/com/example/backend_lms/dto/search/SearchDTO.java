package com.example.backend_lms.dto.search;

import lombok.Data;

@Data
public class SearchDTO {
        private Integer currentPage;
        private Integer size;
        private String sortedField;
}
