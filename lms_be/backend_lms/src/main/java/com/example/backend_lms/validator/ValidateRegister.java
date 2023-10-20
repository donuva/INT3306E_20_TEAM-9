package com.example.backend_lms.validator;

import com.example.backend_lms.dto.UserDTO;
import com.example.backend_lms.entity.User;
import com.example.backend_lms.exception.DuplicateKeyException;
import com.example.backend_lms.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ValidateRegister {
    @Autowired
    UserRepo userRepo;

    public void validateEntry(String username, String phone, String email) throws DuplicateKeyException {
        User user = userRepo.findByUsername(username);
        if(user!=null){
            throw new DuplicateKeyException("Username đã tồn tại");
        }else{
            user = userRepo.findByPhone(phone);
            if(user!=null){
                throw new DuplicateKeyException("Số điện thoại đã tồn tại");
            }else{
                user = userRepo.findByEmail(email);
                if(user!=null){
                    throw new DuplicateKeyException("Email đã tồn tại");
                }
            }
        }
    }
}
