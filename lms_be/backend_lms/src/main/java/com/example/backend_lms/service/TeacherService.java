package com.example.backend_lms.service;

import com.example.backend_lms.dto.*;
import com.example.backend_lms.entity.Teacher;
import com.example.backend_lms.repo.TeacherRepo;
import jakarta.transaction.Transactional;
import javassist.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeacherService {

    public TeacherDTO convert(Teacher teacher){
        return new ModelMapper().map(teacher, TeacherDTO.class);
    }


    @Autowired
    TeacherRepo teacherRepo;
    //update password o userService, o day khong yeu cau phai nhap lai password, set password = password lay trong db
    @Transactional
    public void create(TeacherDTO teacherDTO){
        UserDTO user = teacherDTO.getUser();
        //user.setPassword(new BCryptPasswordEncoder().encode(userDTO.getPassword()));
        teacherDTO.setUser(user);
        teacherRepo.save(new ModelMapper().map(teacherDTO, Teacher.class));
    }

    @Transactional
    public TeacherDTO update(TeacherDTO teacherDTO) throws NotFoundException {
        Teacher teacher = teacherRepo.findById(teacherDTO.getId()).orElse(null);
        if(teacher!=null){
            teacherDTO.getUser().setPassword(teacher.getUser().getPassword());
            teacherRepo.save(new ModelMapper().map(teacherDTO, Teacher.class));
            return new ModelMapper().map(teacherRepo.findById(teacherDTO.getId()), TeacherDTO.class);
        }else{
            throw new NotFoundException("Không tìm thấy giáo viên");
        }
    }

    @Transactional
    public void delete(int id) throws NotFoundException {
        if(teacherRepo.findById(id).isPresent()){
            teacherRepo.deleteById(id);
        }else{
            throw new NotFoundException("Không tìm thấy giáo viên");
        }
    }

    public PageDTO<List<TeacherDTO>> search(String name, int current_page){
        Sort sortBy = Sort.by("user.name").descending();

        PageRequest pageRequest = PageRequest.of(current_page, 15, sortBy);
        Page<Teacher>  page = teacherRepo.findByName(name, pageRequest);

        List<TeacherDTO> teacherDTOS = page.get().map(this::convert).collect(Collectors.toList());
        PageDTO<List<TeacherDTO>> pageDTO = new PageDTO<>();
        pageDTO.setTotalPages(page.getTotalPages());
        pageDTO.setSize(page.getSize());
        pageDTO.setTotalElements(page.getTotalElements());
        pageDTO.setData(teacherDTOS);
        return pageDTO;
    }

    public TeacherDTO findById(int id) throws NotFoundException {
        if (teacherRepo.findById(id).isPresent()) {
            return convert(teacherRepo.findById(id).orElse(null));
        }else{
            throw new NotFoundException("Không tìm thấy giáo viên");
        }
    }
    public TeacherDTO findByUserId(int id) throws NotFoundException {
        if(teacherRepo.findByUserId(id).isPresent()){
            return convert(teacherRepo.findByUserId(id).orElse(null));
        }else{
            throw new NotFoundException("Không tìm thấy giáo viên");
        }
    }
}
