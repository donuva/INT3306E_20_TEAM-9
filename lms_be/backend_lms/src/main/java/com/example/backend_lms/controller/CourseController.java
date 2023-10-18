package com.example.backend_lms.controller;

import com.example.backend_lms.dto.*;
import com.example.backend_lms.service.*;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
public class CourseController {
    @Autowired
    CourseService courseService;

    @Autowired
    StudentService studentService;

    @Autowired
    TeacherService teacherService;

    @Autowired
    UserService userService;

    @Autowired
    NotificationService notificationService;

    @Autowired
    ConversationService conversationService;

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/teacher/courseCreate")
    public void createCourse(@RequestBody CourseDTO courseDTO) {
        courseService.create(courseDTO);
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/teacher/deleteCourse")
    public void deleteCourse(int course_id) throws NotFoundException {
        courseService.delete(course_id);
    }

    @PutMapping("/teacher/updateCourse")
    public ResponseEntity<CourseDTO> updateCourse(@RequestBody CourseDTO courseDTO) throws NotFoundException {
        return ResponseEntity.ok(courseService.update(courseDTO));
    }

    @GetMapping("/student/getCourseList")
    public ResponseEntity<PageDTO<List<CourseListDTO>>> getCoursePageForStudent(
            @RequestParam("current_page") int current_page,
            Principal p) throws NotFoundException {
        String username = p.getName();
        UserDTO userDTO = userService.findByUsername(username);
        StudentDTO studentDTO = studentService.findByUserId(userDTO.getId());
        return ResponseEntity.ok(courseService.getCoursePageByStudent(studentDTO.getId(), current_page));
    }

    @GetMapping("/course/search")
    public ResponseEntity<PageDTO<List<CourseListDTO>>> searchCourse(@RequestParam("course_name") String course_name, @RequestParam("current_page") int current_page){
        return ResponseEntity.ok(courseService.searchCourse(course_name, current_page));
    }

    @GetMapping("/teacher/getRequestList")
    public ResponseEntity<List<CourseEnrollDTO>> getRequestList(@RequestParam("id") int course_id) {
        return ResponseEntity.ok(courseService.courseEnrollList(course_id));
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/student/enrollRequest")
    public void requestToJoinCourse(@RequestParam("course_id") int course_id, Principal p) throws NotFoundException {
        String username = p.getName();
        UserDTO userDTO = userService.findByUsername(username);
        StudentDTO studentDTO = studentService.findByUserId(userDTO.getId());
        courseService.requestToCourse(studentDTO.getId(), course_id);
    }

    @ResponseStatus(HttpStatus.ACCEPTED)
    @PostMapping("/teacher/acceptRequest")
    public void acceptRequest(@RequestParam("request_id") int request_id,
            @RequestParam("code") int code) throws NotFoundException {
        // 1 la accept, 2 la deny
        courseService.isAcceptRequest(request_id, code);
    }

    @GetMapping("/teacher/getCourseList")
    public ResponseEntity<PageDTO<List<CourseListDTO>>> getCoursePageForTeacher(
            @RequestParam("current_page") int current_page,
            Principal p) throws NotFoundException {
        String username = p.getName();
        UserDTO userDTO = userService.findByUsername(username);
        TeacherDTO teacherDTO = teacherService.findByUserId(userDTO.getId());
        return ResponseEntity.ok(courseService.getCoursePageByTeacher(teacherDTO.getId(), current_page));
    }

    @GetMapping("/getSuggestCourse")
    public ResponseEntity<PageDTO<List<CourseListDTO>>> getSuggest(Principal p,
            @RequestParam("current_page") int current_page) throws NotFoundException {
        String username = p.getName();
        UserDTO userDTO = userService.findByUsername(username);
        StudentDTO studentDTO = studentService.findByUserId(userDTO.getId());
        return ResponseEntity.ok(courseService.getSuggestCourse(studentDTO.getCourseList(), current_page));
    }

    @GetMapping("/course/{id}")
    public ResponseEntity<CourseDTO> getCourseById(@PathVariable("id") int id, Principal p) throws NotFoundException {
        String username = p.getName();
        UserDTO userDTO = userService.findByUsername(username);
        return ResponseEntity.ok(courseService.getById(id, userDTO.getId()));
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/teacher/removeStudent")
    public void removeStudent(@RequestParam("student_id") int student_id, @RequestParam("course_id") int course_id)
            throws NotFoundException {
        courseService.removeStudent(student_id, course_id);
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/student/unEnroll")
    public void unEnroll(Principal p, @RequestParam("course_id") int course_id) throws NotFoundException {
        String username = p.getName();
        UserDTO userDTO = userService.findByUsername(username);
        StudentDTO studentDTO = studentService.findByUserId(userDTO.getId());
        courseService.removeStudent(studentDTO.getId(), course_id);
    }

    // THONG BAO
    @GetMapping("/course/notification")
    public ResponseEntity<PageDTO<List<NotificationDTO>>> getCourseNotification(
            @RequestParam("course_id") int course_id,
            @RequestParam("current_page") int current_page) {
        return ResponseEntity.ok(notificationService.searchNotiByCourse(course_id, current_page));
    }

    @PostMapping("/teacher/course/notification/create")
    @ResponseStatus(HttpStatus.OK)
    public void createNotification(@RequestBody NotificationDTO notificationDTO) {
        notificationService.create(notificationDTO);
    }

    @DeleteMapping("/teacher/course/notification/delete")
    @ResponseStatus(HttpStatus.OK)
    public void deleteNotification(@RequestParam("id") int id) throws NotFoundException {
        notificationService.delete(id);
    }

    // Conversation

    @GetMapping("/course/conversation")
    public ResponseEntity<PageDTO<List<ConversationDTO>>> getConversation(int course_id, int current_page) {
        return ResponseEntity.ok(conversationService.getConversation(course_id, current_page));
    }

    @DeleteMapping("/course/conversation")
    public void deleteConversation(@RequestParam("id") int id, Principal p) throws NotFoundException {
        UserDTO userDTO = userService.findByUsername(p.getName());
        conversationService.delete(id, userDTO.getId());
    }

}
