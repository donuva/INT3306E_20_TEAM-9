<p align="center">
  <br>
  
  <img  src="https://i.imgur.com/hkW4YhJ.png" alt="Project logo">
 
</p>

---

<p align="center">EduHub - Hệ thống quản lý trung tâm giáo dục (Learning Mangment System)
    <br>
</p>

## 📝 Mục Lục

- [Giới Thiệu](#Giới-Thiệu)
- [Tổng Quan](#Tổng-Quan---Chức-Năng-Chính)
- [Chi tiết](#Chi-Tiết)


## Giới Thiệu

Đây là project cuối kì của môn "Phát triển ứng dụng web", thiết kế một Hệ thống quản lý học tập (Learning Management System, LMS) trên website. 


### Nhóm gồm các thành viên:
  - Đoàn Văn Nguyên: 21020111
  - Nguyễn Minh Quang: 21020230
  - Nguyễn Quang Huy: 21020633
  - Hà Nguyễn Anh Sơn: 21021537
  - Nguyễn Đức Trọng: 21021546


<!-- <p align="center">
  <br>
  <img width=848px height=480px  src="https://user-images.githubusercontent.com/30159212/211318750-b7c464df-ce4a-49e6-987d-67fa9450b2c8.gif" alt="Project showcase">

</p> -->

<!-- This is full stack web-app created as a final graduation project that aimed to design and build a fully functional learning mangment system (LMS) and integrate it with a varity of machine leraning models to offer common and invoative AI features.

This repository contains the web portion (front-end | backend), but doesn't include the AI models. -->

## Tổng Quan - Chức Năng Chính


- Tài khoản xác thực ba loại người dùng khác nhau: Student - Teacher - Admin.
- Thêm / sửa / xoá các khoá học, với trình tìm kiếm / hiển thị / truy cập khoá học. 
- Hệ thống thông báo dạng Push Notification.
- Thêm bài học / bài tập với tệp `.pdf` hoặc video Youtube. 
- Hệ thống chấm điểm và xem điểm dưới dạng bảng. 



<!-- * Authentication
* Authorization for diffrent uesr roles (student | instructor | admin)
* Youtube integration for course Lectures
* Announcments notification system with push notifications for desktop
* Fast grader for assestments and exams
* Auto Grading for essay questions using Machine learning
* Grade book for instructor
* Deadlines Calendar
* Plagarism detection
* Live cheating detection from webcam and microphone using Machine Learning
* Reports to the instructor of a cheating instance
* Text moderation system -->


## Chi Tiết

- [Đặc tả yêu cầu](./.docs/SRS.md)
- [Thiết kế giao diện](https://www.figma.com/file/63NtzLAeJcc4K0naM92C0P/Education-Management-System?type=design&node-id=0%3A1&mode=design&t=N8Az3P8c6qr1EGbq-1)
- [Lược đồ cơ sở dữ liệu](./.docs/schema.md)
- [Công cụ phát triển](./.docs/tools.md)
- [Hướng dẫn cài đặt và chạy ứng dụng](./.docs/installation.md)



## Full Demo

<!-- <a href="http://www.youtube.com/watch?feature=player_embedded&v=uvtkwOpwAYU" target="_blank">
  <img width=640px height=360px src="https://user-images.githubusercontent.com/30159212/211315771-ebdf99ba-fbf1-42d2-a2f8-c6fabf788040.png" alt="IMAGE ALT TEXT HERE" border="10"/>
</a> -->

## Run server
```
java -jar backend_lms-lms_g9.release.jar
/etc/jupyter/bin/expose 8080
```

