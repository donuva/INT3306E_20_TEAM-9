package com.example.backend_lms.controller;

import com.example.backend_lms.dto.*;
import com.example.backend_lms.service.*;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Calendar;
import java.util.List;

@RestController
@CrossOrigin
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
    @PostMapping("/api/teacher/course")
    public void createCourse(@RequestBody CourseDTO courseDTO) {
        courseService.create(courseDTO);
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/api/teacher/course/{course_id}")
    public void deleteCourse(@PathVariable("course_id") int course_id) throws NotFoundException {
        courseService.delete(course_id);
    }

    @PutMapping("/api/teacher/course")
    public ResponseEntity<CourseDTO> updateCourse(@RequestBody CourseDTO courseDTO) throws NotFoundException {
        return ResponseEntity.ok(courseService.update(courseDTO));
    }

    @GetMapping("/api/student/courses")
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

    @GetMapping("/api/course/search")
    public ResponseEntity<PageDTO<List<CourseListDTO>>> searchCourse(@RequestParam(value = "course_name", required = false) String course_name, @RequestParam(value = "current_page", required = false) Integer current_page){
        if(current_page==null){
            current_page=0;
        }
        return ResponseEntity.ok(courseService.searchCourse(course_name, current_page));
    }

    @GetMapping("/api/teacher/getRequestList/{course_id}")
    public ResponseEntity<List<CourseEnrollDTO>> getRequestList(@PathVariable("course_id") int course_id) {
        return ResponseEntity.ok(courseService.courseEnrollList(course_id));
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/api/student/enroll/{course_id}")
    public void requestToJoinCourse(@PathVariable("course_id") int course_id, Principal p) throws NotFoundException {
        String username = p.getName();
        UserDTO userDTO = userService.findByUsername(username);
        StudentDTO studentDTO = studentService.findByUserId(userDTO.getId());
        courseService.requestToCourse(studentDTO.getId(), course_id);
    }

    @ResponseStatus(HttpStatus.ACCEPTED)
    @PostMapping("/api/teacher/acceptRequest/{request_id}")
    public void acceptRequest(@PathVariable("request_id") int request_id,
            @RequestParam("code") int code) throws NotFoundException {
        // 1 la accept, 2 la deny
        courseService.isAcceptRequest(request_id, code);
    }

    @GetMapping("/api/teacher/courses")
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

    @GetMapping("/api/teacher/courses/{cid}/students")
    public ResponseEntity<List<StudentDTO>> getListStudent(@PathVariable("cid") Integer course_id){
        return ResponseEntity.ok(courseService.getListStudent(course_id));
    }
    @GetMapping("/api/student/getSuggestCourse")
    public ResponseEntity<List<CourseListDTO>> getSuggest(Principal p) throws NotFoundException {

        String username = p.getName();
        UserDTO userDTO = userService.findByUsername(username);
        StudentDTO studentDTO = studentService.findByUserId(userDTO.getId());
        return ResponseEntity.ok(courseService.getSuggestCourse(studentDTO.getCourseList()));
    }

    @GetMapping("/api/course/{id}")
    public ResponseEntity<CourseDTO> getCourseById(@PathVariable("id") int id, Principal p) throws NotFoundException {
        String username = p.getName();
        UserDTO userDTO = userService.findByUsername(username);
        return ResponseEntity.ok(courseService.getById(id, userDTO.getId()));
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/api/teacher/courses/{cid}/removeStudent/{sid}")
    public void removeStudent(@PathVariable("sid") int student_id, @PathVariable("cid") int course_id)
            throws NotFoundException {
        courseService.removeStudent(student_id, course_id);
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/api/student/leave/{cid}")
    public void unEnroll(Principal p, @PathVariable("cid") int course_id) throws NotFoundException {
        String username = p.getName();
        UserDTO userDTO = userService.findByUsername(username);
        StudentDTO studentDTO = studentService.findByUserId(userDTO.getId());
        courseService.removeStudent(studentDTO.getId(), course_id);
    }

    // THONG BAO
    @GetMapping("/api/course/notification")
    public ResponseEntity<PageDTO<List<NotificationDTO>>> getCourseNotification(
            @RequestParam("course_id") int course_id,
            @RequestParam(value = "current_page", required = false) Integer current_page) {
        if(current_page==null){
            current_page=0;
        }
        return ResponseEntity.ok(notificationService.searchNotiByCourse(course_id, current_page));
    }

    @PostMapping("/api/teacher/course/notification")
    @ResponseStatus(HttpStatus.OK)
    public void createNotification(@RequestBody NotificationDTO notificationDTO) {
        notificationService.create(notificationDTO);
    }

    @DeleteMapping("/api/teacher/course/notification/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteNotification(@PathVariable("id") int id) throws NotFoundException {
        notificationService.delete(id);
    }

    // Conversation

    @GetMapping("/api/course/{course_id}/conversation")
    public ResponseEntity<PageDTO<List<ConversationDTO>>> getConversation(@PathVariable("course_id") int course_id, @RequestParam(value = "current_page", required = false) Integer current_page) {
        if(current_page==null){
            current_page=0;
        }
        return ResponseEntity.ok(conversationService.getConversation(course_id, current_page));
    }

    @DeleteMapping("/api/course/conversation/{id}")
    public void deleteConversation(@PathVariable("id") int id, Principal p) throws NotFoundException {
        UserDTO userDTO = userService.findByUsername(p.getName());
        conversationService.delete(id, userDTO.getId());
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/api/course/conversation")
    public void addNewConversation(@RequestBody ConversationDTO conversationDTO){
        conversationService.create(conversationDTO);
    }

    @GetMapping("/api/student/course/preview/{cid}")
    public ResponseEntity<CoursePreviewDTO> getCoursePreview(@PathVariable("cid") int cid, Principal p) throws NotFoundException {
        String username = p.getName();
        UserDTO userDTO = userService.findByUsername(username);
        StudentDTO studentDTO = studentService.findByUserId(userDTO.getId());
        return ResponseEntity.ok(courseService.getCoursePreview(cid, studentDTO));
    }

    @GetMapping("/api/course/{cid}/calendar")
    public ResponseEntity<CalendarDTO> getCalendar(@PathVariable("cid") int cid){
        return ResponseEntity.ok(courseService.courseCalendar(cid));
    }
}
