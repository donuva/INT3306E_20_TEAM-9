package com.example.backend_lms.service;

import com.example.backend_lms.dto.UserDTO;
import com.example.backend_lms.entity.User;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    public UserDTO convert(User user){
        return new ModelMapper().map(user, UserDTO.class);
    }

//    @Transactional

    //TODO CRUD admin

    //TODO quen mat khau

}
