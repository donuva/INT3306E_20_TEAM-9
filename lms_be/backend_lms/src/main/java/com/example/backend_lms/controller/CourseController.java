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
@CrossOrigin(origins = "*")
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
    @PostMapping("/teacher/course")
    public void createCourse(@RequestBody CourseDTO courseDTO) {
        courseService.create(courseDTO);
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/teacher/course/{course_id}")
    public void deleteCourse(@PathVariable("course_id") int course_id) throws NotFoundException {
        courseService.delete(course_id);
    }

    @PutMapping("/teacher/course")
    public ResponseEntity<CourseDTO> updateCourse(@RequestBody CourseDTO courseDTO) throws NotFoundException {
        return ResponseEntity.ok(courseService.update(courseDTO));
    }

    @GetMapping("/student/courses")
    public ResponseEntity<PageDTO<List<CourseListDTO>>> getCoursePageForStudent(
            @RequestParam(value = "current_page", required = false) Integer current_page,
            Principal p) throws NotFoundException {
        if(current_page==null){
            current_page=0;
        }
        String username = p.getName();
        UserDTO userDTO = userService.findByUsername(username);
        StudentDTO studentDTO = studentService.findByUserId(userDTO.getId());
        return ResponseEntity.ok(courseService.getCoursePageByStudent(studentDTO.getId(), current_page));
    }

    @GetMapping("/course/search")
    public ResponseEntity<PageDTO<List<CourseListDTO>>> searchCourse(@RequestParam(value = "course_name", required = false) String course_name, @RequestParam(value = "current_page", required = false) Integer current_page){
        if(current_page==null){
            current_page=0;
        }
        return ResponseEntity.ok(courseService.searchCourse(course_name, current_page));
    }

    @GetMapping("/teacher/getRequestList/{course_id}")
    public ResponseEntity<List<CourseEnrollDTO>> getRequestList(@PathVariable("course_id") int course_id) {
        return ResponseEntity.ok(courseService.courseEnrollList(course_id));
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/student/enroll/{course_id}")
    public void requestToJoinCourse(@PathVariable("course_id") int course_id, Principal p) throws NotFoundException {
        String username = p.getName();
        UserDTO userDTO = userService.findByUsername(username);
        StudentDTO studentDTO = studentService.findByUserId(userDTO.getId());
        courseService.requestToCourse(studentDTO.getId(), course_id);
    }

    @ResponseStatus(HttpStatus.ACCEPTED)
    @PostMapping("/teacher/acceptRequest/{request_id}")
    public void acceptRequest(@PathVariable("request_id") int request_id,
            @RequestParam("code") int code) throws NotFoundException {
        // 1 la accept, 2 la deny
        courseService.isAcceptRequest(request_id, code);
    }

    @GetMapping("/teacher/courses")
    public ResponseEntity<PageDTO<List<CourseListDTO>>> getCoursePageForTeacher(
            @RequestParam(value = "current_page", required = false) Integer current_page,
            Principal p) throws NotFoundException {
        if(current_page==null){
            current_page=0;
        }
        String username = p.getName();
        UserDTO userDTO = userService.findByUsername(username);
        TeacherDTO teacherDTO = teacherService.findByUserId(userDTO.getId());
        return ResponseEntity.ok(courseService.getCoursePageByTeacher(teacherDTO.getId(), current_page));
    }

    @GetMapping("/student/getSuggestCourse")
    public ResponseEntity<List<CourseListDTO>> getSuggest(Principal p) throws NotFoundException {

        String username = p.getName();
        UserDTO userDTO = userService.findByUsername(username);
        StudentDTO studentDTO = studentService.findByUserId(userDTO.getId());
        return ResponseEntity.ok(courseService.getSuggestCourse(studentDTO.getCourseList()));
    }

    @GetMapping("/course/{id}")
    public ResponseEntity<CourseDTO> getCourseById(@PathVariable("id") int id, Principal p) throws NotFoundException {
        String username = p.getName();
        UserDTO userDTO = userService.findByUsername(username);
        return ResponseEntity.ok(courseService.getById(id, userDTO.getId()));
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/teacher/removeStudent")
    public void removeStudent(@RequestParam("student_id") int student_id, @RequestParam("course_id") int course_id)
            throws NotFoundException {
        courseService.removeStudent(student_id, course_id);
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/student/leave")
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
            @RequestParam(value = "current_page", required = false) Integer current_page) {
        if(current_page==null){
            current_page=0;
        }
        return ResponseEntity.ok(notificationService.searchNotiByCourse(course_id, current_page));
    }

    @PostMapping("/teacher/course/notification")
    @ResponseStatus(HttpStatus.OK)
    public void createNotification(@RequestBody NotificationDTO notificationDTO) {
        notificationService.create(notificationDTO);
    }

    @DeleteMapping("/teacher/course/notification/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteNotification(@PathVariable("id") int id) throws NotFoundException {
        notificationService.delete(id);
    }

    // Conversation

    @GetMapping("/course/{course_id}/conversation")
    public ResponseEntity<PageDTO<List<ConversationDTO>>> getConversation(@PathVariable("course_id") int course_id, @RequestParam(value = "current_page", required = false) Integer current_page) {
        if(current_page==null){
            current_page=0;
        }
        return ResponseEntity.ok(conversationService.getConversation(course_id, current_page));
    }

    @DeleteMapping("/course/conversation/{id}")
    public void deleteConversation(@PathVariable("id") int id, Principal p) throws NotFoundException {
        UserDTO userDTO = userService.findByUsername(p.getName());
        conversationService.delete(id, userDTO.getId());
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/course/conversation")
    public void addNewConversation(@RequestBody ConversationDTO conversationDTO){
        conversationService.create(conversationDTO);
    }

    @GetMapping("/student/course/preview/{cid}")
    public ResponseEntity<CourseListDTO> getCoursePreview(@PathVariable("cid") int cid) throws NotFoundException {
        return ResponseEntity.ok(courseService.getCoursePreview(cid));
    }
}
