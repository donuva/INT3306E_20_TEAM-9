package com.example.backend_lms.service;

import com.example.backend_lms.dto.UserDTO;
import com.example.backend_lms.entity.ResetRequest;
import com.example.backend_lms.entity.User;
import com.example.backend_lms.repo.ResetRequestRepo;
import com.example.backend_lms.repo.UserRepo;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.transaction.Transactional;
import javassist.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    ResetRequestRepo resetRequestRepo;

    @Autowired
    EmailService emailService;

    @Value("${jwt.secret:123456}")
    private String secretKey;


    public UserDTO convert(User user) {
        return new ModelMapper().map(user, UserDTO.class);
    }

    // TODO CRUD admin, them ma hoa password

    @Transactional
    public void createAdmin(UserDTO userDTO) {
        userDTO.setPassword(new BCryptPasswordEncoder().encode(userDTO.getPassword()));
        userDTO.setRole("ADMIN");
        userRepo.save(new ModelMapper().map(userDTO, User.class));
    }

    @Transactional
    public void deleteAdmin(int id) throws NotFoundException {
        if (userRepo.findById(id).isPresent()) {
            userRepo.deleteById(id);
        } else {
            throw new NotFoundException("User Id không hợp lệ");
        }
    }

    @Transactional
    public void updatePassword( String password, String token) throws NotFoundException {
        String username = checkTokenValid(token);
        if(username==null){
            throw new NotFoundException("Token invalid");
        }
        User current_user = userRepo.findByUsername(username);
        if (current_user != null) {
            current_user.setPassword(new BCryptPasswordEncoder().encode(password));
            userRepo.save(current_user);
        } else {
            throw new NotFoundException("User not found");
        }
    }

    public UserDTO findByUsername(String username) {
        return convert(userRepo.findByUsername(username));
    }

    public UserDTO updateAdmin(UserDTO userDTO) throws NotFoundException {
        User user = userRepo.findById(userDTO.getId()).orElse(null);
        if (user != null) {
            userDTO.setPassword(user.getPassword());
            userRepo.save(new ModelMapper().map(userDTO, User.class));
            return userDTO;
        } else {
            throw new NotFoundException("Không tìm thấy Id người dùng");
        }
    }

    public UserDTO findById(int id) {
        return convert(userRepo.findById(id).orElse(null));
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User userEntity = userRepo.findByUsername(username);
        if (userEntity == null) {
            throw new UsernameNotFoundException("Not Found");
        }
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();

        authorities.add(new SimpleGrantedAuthority(userEntity.getRole()));
        return new org.springframework.security.core.userdetails.User(username, userEntity.getPassword(), authorities);
    }

    public UserDTO updateUser(UserDTO userDTO) throws NotFoundException {
        User user = userRepo.findById(userDTO.getId()).orElse(null);
        if (user != null) {
            if (userDTO.getAva_url() == null) {
                userDTO.setAva_url(user.getAva_url());
            }
            userDTO.setPassword(user.getPassword());
            userDTO.setRole(user.getRole());
            userRepo.save(new ModelMapper().map(userDTO, User.class));
            return userDTO;
        } else {
            throw new NotFoundException("Không tìm thấy Id người dùng");
        }
    }

    public void resetPassword(String username) {
        User user = userRepo.findByUsername(username);
        if (user != null) {

            Claims claims = Jwts.claims().setSubject(username);
            Date now = new Date();
            long validity = 5;
            Date exp = new Date(now.getTime() + validity * 60 * 1000);
            ResetRequest resetCode = new ResetRequest();
            resetCode.setUsername(username);
            resetCode.setExpiredDate(exp);
            resetRequestRepo.save(resetCode);
            emailService.sendResetCode(user.getEmail(), Jwts.builder().setClaims(claims)
                    .setIssuedAt(now)
                    .setExpiration(exp)
                    .signWith(SignatureAlgorithm.HS256, secretKey)
                    .compact());

        } else {
            throw new RuntimeException("User not found");
        }
    }

    public String checkTokenValid(String token) {
        try {
           String username= Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
            ResetRequest resetRequest =  resetRequestRepo.findByUsername(username);
            if(resetRequest!=null&&resetRequest.getExpiredDate().after(new Date())) {
               resetRequestRepo.delete(resetRequest);
                return username;
            }
        } catch (Exception ignored) {

        }
        return null;
    }

}

