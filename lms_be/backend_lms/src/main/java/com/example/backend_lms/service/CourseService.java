package com.example.backend_lms.service;

import com.example.backend_lms.dto.*;
import com.example.backend_lms.entity.Course;
import com.example.backend_lms.entity.CourseEnroll;
import com.example.backend_lms.entity.Student;
import com.example.backend_lms.entity.Teacher;
import com.example.backend_lms.exception.NotAllowedException;
import com.example.backend_lms.repo.*;
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
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class CourseService {

    @Autowired
    CourseRepo courseRepo;

    @Autowired
    StudentRepo studentRepo;

    @Autowired
    TeacherRepo teacherRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    CourseEnrollRepo courseEnrollRepo;

    public boolean checkIsStudentEnrolled(int student_id, int course_id) {
        if (courseRepo.findById(course_id).isPresent()) {
            List<Student> students = Objects.requireNonNull(courseRepo.findById(course_id).orElse(null)).getStudentList();
            for (Student student : students) {
                if (student.getId() == student_id) {
                    return true;
                }
            }
        }
        return false;
    }

    public boolean checkIsTeacherValid(int teacher_id, int course_id) {
        if (courseRepo.findById(course_id).isPresent()) {
            Teacher teacher = Objects.requireNonNull(courseRepo.findById(course_id).orElse(null)).getTeacher();
            return teacher.getId() == teacher_id;
        }
        return false;
    }

    public CourseListDTO convertListing(Course course) {
        return new ModelMapper().map(course, CourseListDTO.class);
    }

    public CourseDTO convert(Course course) {
        return new ModelMapper().map(course, CourseDTO.class);
    }

    public CourseEnrollDTO convertCourseEnroll(CourseEnroll courseEnroll) {
        return new ModelMapper().map(courseEnroll, CourseEnrollDTO.class);
    }

    @Transactional
    public void create(CourseDTO courseDTO) {
        courseRepo.save(new ModelMapper().map(courseDTO, Course.class));
    }

    @Transactional
    public void delete(int id) throws NotFoundException {
        if (courseRepo.findById(id).isPresent()) {
            courseRepo.deleteById(id);
        } else {
            throw new NotFoundException("Không tìm thấy khóa học");
        }
    }

    public List<StudentDTO> getListStudent(int course_id){
        CourseDTO courseDTO = convert(courseRepo.findById(course_id).orElse(null));
        return courseDTO.getStudentList();
    }

    @Transactional
    public CourseDTO update(CourseDTO courseDTO) throws NotFoundException {
        CourseDTO current_course = convert(courseRepo.findById(courseDTO.getId()).orElse(null));
        if (courseRepo.findById(courseDTO.getId()).isPresent()) {
            if (courseDTO.getExerciseList() == null) {
                courseDTO.setExerciseList(current_course.getExerciseList());
            }
            if (courseDTO.getLessonList() == null) {
                courseDTO.setLessonList(current_course.getLessonList());
            }
            courseRepo.save(new ModelMapper().map(courseDTO, Course.class));
            return new ModelMapper().map(courseRepo.findById(courseDTO.getId()), CourseDTO.class);
        } else {
            throw new NotFoundException("Không tìm được khóa học");
        }
    }

    public CourseDTO getById(int course_id, int user_id) throws NotFoundException {
        if (courseRepo.findById(course_id).isPresent()) {
            if (studentRepo.findByUserId(user_id).isPresent()) {
                if (checkIsStudentEnrolled(Objects.requireNonNull(studentRepo.findByUserId(user_id).orElse(null)).getId(), course_id)) {
                    return convert(courseRepo.findById(course_id).orElse(null));
                } else {
                    throw new NotAllowedException("Không có quyền xem khóa học");
                }
            }
            if (userRepo.findById(user_id).isPresent()) {
                return convert(courseRepo.findById(course_id).orElse(null));
            } else {
                throw new NotFoundException("Id người dùng không hợp lệ");
            }
        } else {
            throw new NotFoundException("Không tìm thấy course");
        }
    }

    public CourseListDTO getCoursePreview(int course_id) throws NotFoundException {
        if (courseRepo.findById(course_id).isPresent()) {
            return convertListing(courseRepo.findById(course_id).orElse(null));
        }else{
            throw new NotFoundException("Không tìm thấy course");
        }
    }


        public PageDTO<List<CourseListDTO>> getCoursePageByStudent ( int student_id,
        int current_page) throws NotFoundException {
            if (studentRepo.findById(student_id).isPresent()) {
                Sort sortBy = Sort.by("name").ascending();
                PageRequest pageRequest = PageRequest.of(current_page, 16, sortBy);
                List<Course> courses = Objects.requireNonNull(studentRepo.findById(student_id).orElse(null)).getCourseList();
                Page<Course> page = courseRepo.findByCourseList(courses.stream().map(Course::getId).collect(Collectors.toList()), pageRequest);

                List<CourseListDTO> courseDTOS = page.get().map(this::convertListing).collect(Collectors.toList());
                PageDTO<List<CourseListDTO>> pageDTO = new PageDTO<>();
                pageDTO.setTotalPages(page.getTotalPages());
                pageDTO.setSize(page.getSize());
                pageDTO.setTotalElements(page.getTotalElements());
                pageDTO.setData(courseDTOS);
                return pageDTO;
            } else {
                throw new NotFoundException("Id học sinh không hợp lệ");
            }
        }

        public PageDTO<List<CourseListDTO>> getCoursePageByTeacher ( int teacher_id,
        int current_page) throws NotFoundException {
            if (teacherRepo.findById(teacher_id).isPresent()) {
                Sort sortBy = Sort.by("name").ascending();
                PageRequest pageRequest = PageRequest.of(current_page, 16, sortBy);
                List<Course> courses = Objects.requireNonNull(teacherRepo.findById(teacher_id).orElse(null)).getCourseList();
                Page<Course> page = courseRepo.findByCourseList(courses.stream().map(Course::getId).collect(Collectors.toList()), pageRequest);
                List<CourseListDTO> courseDTOS = page.get().map(this::convertListing).collect(Collectors.toList());
                PageDTO<List<CourseListDTO>> pageDTO = new PageDTO<>();
                pageDTO.setTotalPages(page.getTotalPages());
                pageDTO.setSize(page.getSize());
                pageDTO.setTotalElements(page.getTotalElements());
                pageDTO.setData(courseDTOS);
                return pageDTO;
            } else {
                throw new NotFoundException("Id giáo viên không hợp lệ");
            }
        }

        //hoc sinh request vao course
        public void requestToCourse ( int student_id, int course_id) throws NotFoundException {
            if (studentRepo.findById(student_id).isPresent()) {
                if (courseRepo.findById(course_id).isPresent()) {
                    if (courseEnrollRepo.findByCourseAndStudent(student_id, course_id).isEmpty()) {
                        CourseEnroll courseEnroll = new CourseEnroll();
                        courseEnroll.setCourse(courseRepo.findById(course_id).orElse(null));
                        courseEnroll.setStatus(0);
                        courseEnroll.setStudent(studentRepo.findById(student_id).orElse(null));
                        courseEnrollRepo.save(courseEnroll);
                    } else {
                        throw new NotFoundException("Đã từng đăng ký, đang đợi phản hồi từ giáo viên");
                    }
                } else {
                    throw new NotFoundException("Id khóa học không hợp lệ");
                }
            } else {
                throw new NotFoundException("Id học sinh không hợp lệ");
            }
        }

        //giao vien chu dong add hoc sinh vao course

        public void addStudent ( int course_id, int student_id){
            Course course = courseRepo.findById(course_id).orElse(null);
            Student student = studentRepo.findById(student_id).orElse(null);
            assert course != null;
            if(course.getStudentList().contains(student)){
                return;
            }
            course.getStudentList().add(student);
            assert student != null;
            student.getCourseList().add(course);
            courseRepo.save(course);
            studentRepo.save(student);
        }

        //hien ra danh sach yeu cau vao course
        public List<CourseEnrollDTO> courseEnrollList ( int course_id){
            return courseEnrollRepo.findAllByCourse(course_id).stream().map(this::convertCourseEnroll).collect(Collectors.toList());
        }

        //giao vien accept vao course hoac reject

        public void isAcceptRequest ( int request_id, int code) throws NotFoundException {
            CourseEnroll courseEnroll = courseEnrollRepo.findById(request_id).orElse(null);
            if (courseEnroll != null) {
                if (code == 1) {
                    addStudent(courseEnroll.getCourse().getId(), courseEnroll.getStudent().getId());
                    courseEnroll.setStatus(1);
                } else if (code == 2) {
                    courseEnroll.setStatus(2);
                }
                courseEnrollRepo.save(courseEnroll);
            } else {
                throw new NotFoundException("Không tìm thấy yêu cầu tham gia");
            }
        }


        //xoa hoc vien khoi course / hoc vien thoat khoi course
        public void removeStudent ( int student_id, int course_id) throws NotFoundException {
            Course course = courseRepo.findById(course_id).orElse(null);
            Student student = studentRepo.findById(student_id).orElse(null);
            if (course != null && student != null) {
                course.getStudentList().remove(student);
                student.getCourseList().remove(course);
                studentRepo.save(student);
                courseRepo.save(course);
            } else {
                throw new NotFoundException("Id của khóa học hoặc học sinh không hợp lệ");
            }
        }

        public List<CourseListDTO> getSuggestCourse (List <CourseDTO> listCourse){
            Sort sortBy = Sort.by("createdAt").descending();
            PageRequest pageRequest = PageRequest.of(0, 8, sortBy);
            List<String> categories = listCourse.stream().map(CourseDTO::getCategory).toList();
            Page<Course> page = courseRepo.findByCourseCategory(categories, pageRequest);

            return page.get().map(this::convertListing).collect(Collectors.toList());
        }

        public PageDTO<List<CourseListDTO>> searchCourse (String course_name,int current_page){
            Sort sortBy = Sort.by("name").descending();
            PageRequest pageRequest = PageRequest.of(current_page, 16, sortBy);
            Page<Course> page;
            if (!StringUtils.hasText(course_name)) {
                page = courseRepo.findAll(pageRequest);
            } else {
                page = courseRepo.findCourseByName("%" + course_name + "%", pageRequest);
            }

            PageDTO<List<CourseListDTO>> pageDTO = new PageDTO<>();
            pageDTO.setTotalPages(page.getTotalPages());
            pageDTO.setSize(page.getSize());
            pageDTO.setTotalElements(page.getTotalElements());
            pageDTO.setData(page.stream().map(this::convertListing).collect(Collectors.toList()));
            return pageDTO;
        }
    }
