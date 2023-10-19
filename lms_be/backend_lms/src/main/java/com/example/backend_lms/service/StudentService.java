package com.example.backend_lms.service;

import com.example.backend_lms.dto.PageDTO;
import com.example.backend_lms.dto.StudentDTO;
import com.example.backend_lms.dto.TeacherDTO;
import com.example.backend_lms.dto.UserDTO;
import com.example.backend_lms.entity.Student;
import com.example.backend_lms.entity.Teacher;
import com.example.backend_lms.repo.StudentRepo;
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
public class StudentService {

    @Autowired
    StudentRepo studentRepo;

    public StudentDTO convert(Student student){
        return new ModelMapper().map(student, StudentDTO.class);
    }

    @Transactional
    public void create(StudentDTO studentDTO){
        UserDTO user = studentDTO.getUser();
        //user.setPassword(new BCryptPasswordEncoder().encode(userDTO.getPassword()));
        user.setRole("STUDENT");
        studentDTO.setUser(user);
        studentRepo.save(new ModelMapper().map(studentDTO, Student.class));
    }

    @Transactional
    public void delete(int id) throws NotFoundException {
        if(studentRepo.findById(id).isPresent()) {
            studentRepo.deleteById(id);
        }else{
            throw new NotFoundException("Không tim thấy học sinh");
        }
    }

    @Transactional
    public StudentDTO update(StudentDTO studentDTO) throws NotFoundException {
        Student student = studentRepo.findById(studentDTO.getId()).orElse(null);
        if(student!=null){
            studentDTO.getUser().setPassword(student.getUser().getPassword());
            studentDTO.getUser().setRole(student.getUser().getRole());
            studentRepo.save(new ModelMapper().map(studentDTO, Student.class));
            return new ModelMapper().map(studentRepo.findById(studentDTO.getId()), StudentDTO.class);
        }else{
            throw new NotFoundException("Không tìm thấy học sinh");
        }
    }

    public PageDTO<List<StudentDTO>> search(String name, int current_page){
        Sort sortBy = Sort.by("user.name").descending();

        PageRequest pageRequest = PageRequest.of(current_page, 15, sortBy);

        Page<Student> page = studentRepo.findByName("%"+name+"%", pageRequest);

        List<StudentDTO> studentDTOS = page.get().map(this::convert).collect(Collectors.toList());
        PageDTO<List<StudentDTO>> pageDTO = new PageDTO<>();
        pageDTO.setTotalPages(page.getTotalPages());
        pageDTO.setSize(page.getSize());
        pageDTO.setTotalElements(page.getTotalElements());
        pageDTO.setData(studentDTOS);
        return pageDTO;
    }

    public StudentDTO findById(int id) throws NotFoundException {
        if (studentRepo.findById(id).isPresent()) {
            return convert(studentRepo.findById(id).orElse(null));
        }else{
            throw new NotFoundException("Không tìm thấy học sinh");
        }
    }

    public StudentDTO findByUserId(int id) throws NotFoundException {
        if(studentRepo.findByUserId(id).isPresent()){
            return convert(studentRepo.findByUserId(id).orElse(null));
        }else{
            throw new NotFoundException("Không tìm thấy học sinh");
        }
    }
}
