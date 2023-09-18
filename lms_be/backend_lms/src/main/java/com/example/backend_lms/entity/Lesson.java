package com.example.backend_lms.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class Lesson extends TimeAuditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String content;

    @ElementCollection
    @CollectionTable(name="lesson_url", joinColumns = @JoinColumn(name="lesson_id"))
    @Column(name="url")
    private List<String> urls;
}
