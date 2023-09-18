package com.example.backend_lms.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;
import java.util.List;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class User extends TimeAuditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private String ava_url;

    private String bio;

    @Temporal(TemporalType.DATE)
    private Date birthdate;

    @Column(unique = true)
    private String username;

    private String password;

    @Column(unique = true)
    private String email;

    @Column(unique = true)
    private String phone;

    @ElementCollection
    @CollectionTable(name="user_role", joinColumns = @JoinColumn(name="user_id"))
    @Column(name="role")
    private List<String> roles;
}
