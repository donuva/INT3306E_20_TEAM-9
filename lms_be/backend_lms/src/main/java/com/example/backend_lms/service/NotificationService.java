package com.example.backend_lms.service;

import com.example.backend_lms.dto.ConversationDTO;
import com.example.backend_lms.dto.NotificationDTO;
import com.example.backend_lms.dto.PageDTO;
import com.example.backend_lms.entity.Conversation;
import com.example.backend_lms.entity.Course;
import com.example.backend_lms.entity.Notification;
import com.example.backend_lms.repo.NotificationRepo;
import com.example.backend_lms.repo.StudentRepo;
import jakarta.transaction.Transactional;
import javassist.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class NotificationService {
    @Autowired
    NotificationRepo notificationRepo;

    @Autowired
    StudentRepo studentRepo;

    public NotificationDTO convert(Notification notification){
        return new ModelMapper().map(notification, NotificationDTO.class);
    }

    @Transactional
    public void create(NotificationDTO notificationDTO){
        notificationRepo.save(new ModelMapper().map(notificationDTO, Notification.class));
    }

    @Transactional
    public void delete(int id) throws NotFoundException {
        if (notificationRepo.findById(id).isPresent()) {
            notificationRepo.deleteById(id);
        } else {
            throw new NotFoundException("Id không hợp lệ");
        }
    }

    @Transactional
    public NotificationDTO update(NotificationDTO notificationDTO) throws NotFoundException {
        if(notificationRepo.findById(notificationDTO.getId()).isPresent()){
            notificationRepo.save(new ModelMapper().map(notificationDTO, Notification.class));
            return convert(notificationRepo.findById(notificationDTO.getId()).orElse(null));
        }else{
            throw new NotFoundException("Id không hợp lệ");
        }
    }

    public PageDTO<List<NotificationDTO>> searchNotiByCourse(int course_id, int current_page){
        Sort sortBy = Sort.by("createdDate").descending();
        PageRequest pageRequest = PageRequest.of(current_page, 15, sortBy);
        Page<Notification> page = notificationRepo.findAllByCourse(course_id, pageRequest);

        List<NotificationDTO> notificationDTOS = page.get().map(this::convert).collect(Collectors.toList());
        PageDTO<List<NotificationDTO>> pageDTO = new PageDTO<>();
        pageDTO.setTotalPages(page.getTotalPages());
        pageDTO.setSize(page.getSize());
        pageDTO.setTotalElements(page.getTotalElements());
        pageDTO.setData(notificationDTOS);
        return pageDTO;
    }

    public PageDTO<List<NotificationDTO>> searchNotiByStudent(int student_id, int current_page) throws NotFoundException {
        Sort sortBy = Sort.by("createdDate").descending();
        PageRequest pageRequest = PageRequest.of(current_page, 15, sortBy);
        if(studentRepo.findById(student_id).isPresent()) {
            List<Course> courses = Objects.requireNonNull(studentRepo.findById(student_id).orElse(null)).getCourseList();
            Page<Notification> page = notificationRepo.findAllByStudent(courses.stream().map(Course::getId).collect(Collectors.toList()), pageRequest);

            List<NotificationDTO> notificationDTOS = page.get().map(this::convert).collect(Collectors.toList());
            PageDTO<List<NotificationDTO>> pageDTO = new PageDTO<>();
            pageDTO.setTotalPages(page.getTotalPages());
            pageDTO.setSize(page.getSize());
            pageDTO.setTotalElements(page.getTotalElements());
            pageDTO.setData(notificationDTOS);
            return pageDTO;
        }else{
            throw new NotFoundException("Student_id không hợp lệ");
        }
    }
}
