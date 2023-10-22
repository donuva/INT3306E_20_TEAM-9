package com.example.backend_lms.service;

import com.example.backend_lms.dto.UserDTO;
import com.example.backend_lms.entity.User;
import com.example.backend_lms.repo.UserRepo;
import jakarta.transaction.Transactional;
import javassist.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepo userRepo;

    public UserDTO convert(User user) {
        return new ModelMapper().map(user, UserDTO.class);
    }


//    TODO CRUD admin, them ma hoa password

    @Transactional
    public void createAdmin(UserDTO userDTO) {
        //userDTO.setPassword(new BCryptPasswordEncoder().encode(userDTO.getPassword()));
        userDTO.setRole("ADMIN");
        userRepo.save(new ModelMapper().map(userDTO, User.class));
    }

    @Transactional
    public void deleteAdmin(int id) throws NotFoundException {
        if(userRepo.findById(id).isPresent()) {
            userRepo.deleteById(id);
        }else{
            throw new NotFoundException("User Id không hợp lệ");
        }
    }

    @Transactional
    public void updatePassword(int user_id, String password) throws NotFoundException {

        User current_user = userRepo.findById(user_id).orElse(null);
        if (current_user != null) {
//            current_user.setPassword(new BCryptPasswordEncoder().encode(password));
            userRepo.save(current_user);
        } else {
            throw new NotFoundException("User_id không hợp lệ");
        }
    }


    public UserDTO findByUsername(String username) {
        return convert(userRepo.findByUsername(username));
    }

    public UserDTO updateAdmin(UserDTO userDTO) throws NotFoundException {
        User user = userRepo.findById(userDTO.getId()).orElse(null);
        if(user!=null){
            userDTO.setPassword(user.getPassword());
            userRepo.save(new ModelMapper().map(userDTO, User.class));
            return convert(userRepo.findById(userDTO.getId()).orElse(null));
        }else{
            throw new NotFoundException("Không tìm thấy Id người dùng");
        }
    }

    public UserDTO findById(int id) {
        return convert(userRepo.findById(id).orElse(null));
    }


    //TODO quen mat khau

}
