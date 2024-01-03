-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql:3306
-- Generation Time: Dec 29, 2023 at 04:09 PM
-- Server version: 5.7.44
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fall2324w20g9_lms`
--

-- --------------------------------------------------------

--
-- Table structure for table `conversation`
--

CREATE TABLE `conversation` (
  `id` int(11) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `msg` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `topic` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `conversation`
--

INSERT INTO `conversation` (`id`, `created_at`, `updated_at`, `msg`, `topic`, `course_id`, `user_id`) VALUES
(1, '2023-12-20', '2023-12-20', 'bàn luận 1', NULL, 2, 5),
(2, '2023-12-20', '2023-12-20', 'Hello thầy huy\n', NULL, 1, 10),
(3, '2023-12-20', '2023-12-20', 'what\'\'sup\n', NULL, 2, 10);

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `teacher_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `created_at`, `updated_at`, `category`, `description`, `name`, `teacher_id`) VALUES
(1, '2023-12-19', '2023-12-23', 'Tự nhiên', 'Khóa này dạy toán', 'Toán ', 2),
(2, '2023-12-20', '2023-12-23', 'Tự nhiên', 'Khóa học này cung cấp kiến thức cơ bản đến nâng cao về toán lớp 11.', 'Toán', 2),
(3, '2023-12-20', '2023-12-20', 'Khoa Học Tự Nhiên', 'Lớp LSD của thầy Nguyên!', 'Lịch Sử Đảng', 4),
(4, '2023-12-20', '2023-12-20', 'Khoa Học Tự Nhiên', 'thầy Nguyên!', 'Tín hiệu', 4),
(5, '2023-12-20', '2023-12-20', 'Khoa Học Tự Nhiên', 'Thầy Nguyên!', 'Xác Suất', 4),
(6, '2023-12-20', '2023-12-20', 'Khoa Học Tự Nhiên', 'Thầy Nguyên!', 'Xác Suất', 4),
(7, '2023-12-20', '2023-12-20', 'Tài liệu đọc', 'Tài liệu đọc tuần 1', 'Ngữ Văn 9', 7),
(8, '2023-12-20', '2023-12-20', 'Tài liệu đọc', 'Tài liệu đọc tuần 1', 'Ngữ Văn 9', 7),
(9, '2023-12-25', '2023-12-25', 'English', 'Chương trình Tiếng Anh 12 của Bộ GDVN', 'Tiếng Anh 12', 5),
(10, '2023-12-25', '2023-12-25', 'English', 'Chương trình Tiếng Anh 11 của Bộ GDVN', 'Tiếng Anh 11', 5),
(11, '2023-12-25', '2023-12-25', 'English', 'Chương trình Tiếng Anh 10 của Bộ GDVN', 'Tiếng Anh 10', 5),
(12, '2023-12-25', '2023-12-25', 'Coding', 'Môn học đầu tiên mà bất cứ sinh viên CNTT nào cũng sẽ học ở năm nhất đại học', 'Nhập Môn Lập Trình', 5),
(13, '2023-12-29', '2023-12-29', 'Khoa Học Tự Nhiên', 'NGUYÊN', 'XÁC SUẤT THỐNG KÊ', 4),
(14, '2023-12-29', '2023-12-29', 'ngoại ngữ', 'dạy tiếng wibu', 'tiếng nhật', 8),
(15, '2023-12-29', '2023-12-29', 'ngoại ngữ', 'dạy tiếng wibu', 'tiếng nhật', 8);

-- --------------------------------------------------------

--
-- Table structure for table `course_enroll`
--

CREATE TABLE `course_enroll` (
  `id` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `course_id` int(11) DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `course_enroll`
--

INSERT INTO `course_enroll` (`id`, `status`, `course_id`, `student_id`) VALUES
(1, 1, 6, 3),
(2, 1, 3, 4),
(4, 1, 2, 4),
(5, 1, 1, 4),
(6, 1, 6, 5),
(7, 1, 2, 5),
(8, 1, 13, 1);

-- --------------------------------------------------------

--
-- Table structure for table `course_learn`
--

CREATE TABLE `course_learn` (
  `course_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `course_learn`
--

INSERT INTO `course_learn` (`course_id`, `student_id`) VALUES
(3, 4),
(6, 3),
(6, 5),
(2, 4),
(2, 5),
(2, 1),
(2, 2),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(13, 1);

-- --------------------------------------------------------

--
-- Table structure for table `exercise`
--

CREATE TABLE `exercise` (
  `id` int(11) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `content` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deadline` datetime(6) DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `exercise`
--

INSERT INTO `exercise` (`id`, `created_at`, `updated_at`, `content`, `deadline`, `title`, `course_id`) VALUES
(1, '2023-12-20', '2023-12-20', 'hãy viết cảm nghĩ về tư tưởng HỒ CHÍ MINH!', '2024-04-30 17:00:00.000000', 'exercise1', 3),
(2, '2023-12-20', '2023-12-20', 'Các em làm bài tôi đã gửi rồi nộp bài làm lên đây nhé', '2023-12-22 17:00:00.000000', 'Bài tập cuối tuần', 2),
(3, '2023-12-20', '2023-12-20', 'Nêu suy nghĩ của em về tầm quan trọng của CNTT trong cuộc sống ngày nay.', '2023-12-20 17:00:00.000000', 'Bài kiểm tra viết số 1', 7),
(4, '2023-12-29', '2023-12-29', 'nộp gấp hôm nay', '2023-12-29 17:00:00.000000', 'exercise1', 13);

-- --------------------------------------------------------

--
-- Table structure for table `lesson`
--

CREATE TABLE `lesson` (
  `id` int(11) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `content` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `topic` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lesson`
--

INSERT INTO `lesson` (`id`, `created_at`, `updated_at`, `content`, `topic`, `url`, `course_id`) VALUES
(1, '2023-12-20', '2023-12-20', 'less', 'lesson1', NULL, 3),
(2, '2023-12-20', '2023-12-20', 'les2', 'lesson2', '2.-TTDA_-Tên-đội-thi.doc2c6bd2ed-7338-4129-bd7c-a5ce801bed3c.doc', 3),
(3, '2023-12-20', '2023-12-20', 'les3', 'lesson3', 'Brief_nháp.txt5f52f477-e410-441c-b9e8-11cc0cce3626.txt', 3),
(4, '2023-12-20', '2023-12-20', 'smallpdf', 'smallpdf', 'cover_hd.pdf93c4fb04-027a-4da9-babf-adce80ffd505.pdf', 3),
(5, '2023-12-20', '2023-12-20', 'đọc đi cho giỏi ', 'Chiếc lược ngà', 'CHIẾC LƯỢC NGÀ.docx5abdec3b-72a3-46eb-b268-a0da945efdc5.docx', 7);

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` int(11) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `msg` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `topic` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`id`, `created_at`, `updated_at`, `msg`, `topic`, `course_id`) VALUES
(1, '2023-12-19', '2023-12-19', 'Dạy bù vào 20/12', 'Hôm nay mưa, nghỉ học nhé', 1),
(2, '2023-12-20', '2023-12-20', 'Thầy cho điểm bài tập cuối tuần rồi nhé, ai có thắc mắc thì báo lại thầy', 'Đã có điểm bài tập cuối tuần', 2),
(3, '2023-12-20', '2023-12-20', '3423', 'abc', 3),
(4, '2023-12-20', '2023-12-20', 'Mai lạnh, cô lười, mai lớp nghỉ học', 'Thông báo nghỉ học', 7),
(5, '2023-12-20', '2023-12-20', 'Mai hết tháng, lớp đọc cho cô 50 củ tiền học lớp nhé :)))', 'Thông báo đóng tiền', 7),
(6, '2023-12-29', '2023-12-29', 'chăm chỉ', '3/1 nộp bài tập lớn', 13);

-- --------------------------------------------------------

--
-- Table structure for table `reset_request`
--

CREATE TABLE `reset_request` (
  `id` int(11) NOT NULL,
  `expired_date` datetime(6) DEFAULT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reset_request`
--

INSERT INTO `reset_request` (`id`, `expired_date`, `username`) VALUES
(18, '2023-12-29 15:30:25.886000', 'nguyen.teacher');

-- --------------------------------------------------------

--
-- Table structure for table `score_exercise`
--

CREATE TABLE `score_exercise` (
  `id` int(11) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `exercise_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `grade` double DEFAULT NULL,
  `msg` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `exercise_id` int(11) DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL,
  `content` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `score_exercise`
--

INSERT INTO `score_exercise` (`id`, `created_at`, `updated_at`, `exercise_url`, `grade`, `msg`, `exercise_id`, `student_id`, `content`) VALUES
(1, '2023-12-20', '2023-12-20', NULL, NULL, NULL, 1, 4, 'Yeh sure'),
(2, '2023-12-20', '2023-12-20', NULL, 9, NULL, 2, 4, 'Gang Gang'),
(3, '2023-12-29', '2023-12-29', 'url_exerciseWorkcover_hd.pdf5c3cebe0-344e-4178-919f-0e23cafb0b30.pdf', NULL, NULL, 4, 1, 'đây');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `user_id`) VALUES
(1, 4),
(2, 8),
(3, 9),
(4, 10),
(5, 11);

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `teacher`
--

INSERT INTO `teacher` (`id`, `user_id`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 5),
(5, 6),
(6, 7),
(7, 12),
(8, 13);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `ava_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bio` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `created_at`, `updated_at`, `ava_url`, `bio`, `birthdate`, `email`, `name`, `password`, `phone`, `role`, `username`) VALUES
(1, '2023-12-19', '2023-12-19', NULL, 'admin', '2013-05-16', 'huynguyenquang030803@gmail.com', 'Huy', '$2a$10$c.ZgouhMlAxr4NvDqtEgEus5v7eAjHGLoj3/3EJv/3VXUVY5PHMJe', '0123456789', 'TEACHER', 'huy1234'),
(2, '2023-12-19', '2023-12-27', 'avatar80f9e4cc-19ba-4499-967a-6e7e8bcdd867.png', 'Giáo viên Toán', '2001-07-12', 'teacher@gmail.com', 'Nguyễn Văn B', '$2a$10$5/GyX1o8KQQPdKibIZE9s.51vtTEJcWuSefDx4LQL.aWdSeuG.4Be', '123456789', 'TEACHER', 'teacher1'),
(3, '2023-12-19', '2023-12-19', 'default_ava.png', 'Giáo viên 2', '2004-12-01', 'giaovien2@mail.com', 'Giáo viên 2', '$2a$10$8Ac1TLtZlA4AEN6ri6XCcu1k6qBeM2rT5ba/JtHKEnAJ3Qs1DukvO', '1234561', 'TEACHER', 'teacher2'),
(4, '2023-12-19', '2023-12-19', 'avatara52be6bc-9151-4a45-bc5c-aae2ff7b409c.jpg', '\"Im NGUYEN DOAN , student of Mr.Tung Hoang in Web_20 class\"', '2003-02-02', '21020111@vnu.edu.vn', 'DOAN VAN NGUYEN', '$2a$10$IhxrxG9KOCmgcMERJwSLiu7oGWo9kOu0Ytd2D8JqvJix4.3.l1P2O', '123456789001', 'STUDENT', 'nguyen.student'),
(5, '2023-12-19', '2023-12-19', 'avatar8733a032-ea23-4ebd-8c87-bd7be2c31b49.png', '\"Im NGUYEN, teacher of UET\"', '2003-02-02', '210201112@vnu.edu.vn', 'Mr.Nguyen', '$2a$10$jM.020R/Z12LmsrvTqrPPur5IKdVbjRdxwMLNMXUehMAyWwT44nK.', '09876543121', 'TEACHER', 'nguyen.teacher'),
(6, '2023-12-19', '2023-12-19', 'default_ava.png', 'WWE Professional teacher', '1994-08-06', 'j.cena@gmail.com', 'John Cena', '$2a$10$8kqwdHibLqPByXBgP8lvF.vf/QBjMxon1TYwROewphj/b20cvHfL.', '0123673247', 'TEACHER', 'johncena'),
(7, '2023-12-19', '2023-12-19', 'default_ava.png', 'teacher3', '2003-08-03', 'teacher@gmail.com1', 'teacher3', '$2a$10$a5uU.CND6YyYQL0///984u4fuh/e.emmtvpplpCzogtFGovfx8l/y', '8942890433230489', 'TEACHER', 'teacher3'),
(8, '2023-12-20', '2023-12-20', 'default_ava.jpg', 'Mình học lớp 11\r\n', '2003-08-03', '21020633@vnu.edu.vn', 'Nguyen Quang Huy', '$2a$10$HJ5QZ5cJoxFoQizj9IHbB.T/fsQ2JHNuGrJyCtP5mBPLiB7d83aCC', '+84376551641', 'STUDENT', 'student1'),
(9, '2023-12-20', '2023-12-20', 'default_ava.jpg', 'hehe', '2016-11-27', 'abc@abc.abc', 'huy', '$2a$10$4SuIK0AloHW.ZSD2ciUnyuhcsQXXEgU7Pl7AB/kKMWxvG2hOVI9wG', '830208', 'STUDENT', 'quân'),
(10, '2023-12-20', '2023-12-20', 'default_ava.jpg', '12334', '2023-12-12', 'quan23403@gmail.com', 'Hoàng Minh Quân', '$2a$10$JZAw7GkBlBXbwnIhNnjMWuarBHFf4m6JR5RbvU7zykAlYAO7nrNDu', '0376179201', 'STUDENT', 'quan23403'),
(11, '2023-12-20', '2023-12-20', 'default_ava.jpg', '20 tuoi', '2023-12-05', '123123', 'loc', '$2a$10$mNqn0tlabr85RCq1CQjLJ.ktZxwBNaLpz.eUel7DlBzAbrq0cz0jW', '123123123', 'STUDENT', 'loc123'),
(12, '2023-12-20', '2023-12-20', 'default_ava.jpg', 'bcjxkc', '2002-11-20', 'gianghv.hnue@gmail.com', 'giang vu', '$2a$10$A8PnMZH5dTt1HCeZx1BPBOb2GqO13G5flwOHIZCmOe2ScLjqMTLNi', '0912632417', 'TEACHER', 'gianghv01'),
(13, '2023-12-29', '2023-12-29', 'default_ava.jpg', 'thầy này giỏi tiếng wibu', '2002-12-17', 'hanguyenanhson@gmail.com', 'son', '$2a$10$hmk5G9ntnSB9Ioqpg4rPxes3JEQZqXrLUrUOjCo/ovpFawkgywHH2', '01234567890', 'TEACHER', 'son');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `conversation`
--
ALTER TABLE `conversation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKnwuel0cmwyk1vo6il3u1yh9kr` (`course_id`),
  ADD KEY `FKkypkkr66d2u1y1id2xq9cjyex` (`user_id`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKsybhlxoejr4j3teomm5u2bx1n` (`teacher_id`);

--
-- Indexes for table `course_enroll`
--
ALTER TABLE `course_enroll`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKc6dylncrce4dmk3ms1fvuftj8` (`course_id`),
  ADD KEY `FKhv1xcwvubxtfhmnjlca9dxfyx` (`student_id`);

--
-- Indexes for table `course_learn`
--
ALTER TABLE `course_learn`
  ADD KEY `FK2ej34cihguk8oc2791rfoap29` (`student_id`),
  ADD KEY `FKp451lxy61p2mno01cg2y1fb11` (`course_id`);

--
-- Indexes for table `exercise`
--
ALTER TABLE `exercise`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKb3afwcm56aof8vw2p5tfma67n` (`course_id`);

--
-- Indexes for table `lesson`
--
ALTER TABLE `lesson`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKjs3c7skmg8bvdddok5lc7s807` (`course_id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK2qvynpew0iu557b4qk9go0u0c` (`course_id`);

--
-- Indexes for table `reset_request`
--
ALTER TABLE `reset_request`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `score_exercise`
--
ALTER TABLE `score_exercise`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKpluh2gaecaprs0e32dqu3g0jj` (`exercise_id`),
  ADD KEY `FKn9odwym5wtj3ki0sl9bnadhfm` (`student_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_bkix9btnoi1n917ll7bplkvg5` (`user_id`);

--
-- Indexes for table `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_i5wqs2ds2vpmfpbcdxi9m2jvr` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`),
  ADD UNIQUE KEY `UK_589idila9li6a4arw1t8ht1gx` (`phone`),
  ADD UNIQUE KEY `UK_sb8bbouer5wak8vyiiy4pf2bx` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `conversation`
--
ALTER TABLE `conversation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `course_enroll`
--
ALTER TABLE `course_enroll`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `exercise`
--
ALTER TABLE `exercise`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `lesson`
--
ALTER TABLE `lesson`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `reset_request`
--
ALTER TABLE `reset_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `score_exercise`
--
ALTER TABLE `score_exercise`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `teacher`
--
ALTER TABLE `teacher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `conversation`
--
ALTER TABLE `conversation`
  ADD CONSTRAINT `FKkypkkr66d2u1y1id2xq9cjyex` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKnwuel0cmwyk1vo6il3u1yh9kr` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`);

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `FKsybhlxoejr4j3teomm5u2bx1n` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`);

--
-- Constraints for table `course_enroll`
--
ALTER TABLE `course_enroll`
  ADD CONSTRAINT `FKc6dylncrce4dmk3ms1fvuftj8` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  ADD CONSTRAINT `FKhv1xcwvubxtfhmnjlca9dxfyx` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`);

--
-- Constraints for table `course_learn`
--
ALTER TABLE `course_learn`
  ADD CONSTRAINT `FK2ej34cihguk8oc2791rfoap29` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`),
  ADD CONSTRAINT `FKp451lxy61p2mno01cg2y1fb11` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`);

--
-- Constraints for table `exercise`
--
ALTER TABLE `exercise`
  ADD CONSTRAINT `FKb3afwcm56aof8vw2p5tfma67n` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`);

--
-- Constraints for table `lesson`
--
ALTER TABLE `lesson`
  ADD CONSTRAINT `FKjs3c7skmg8bvdddok5lc7s807` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`);

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `FK2qvynpew0iu557b4qk9go0u0c` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`);

--
-- Constraints for table `score_exercise`
--
ALTER TABLE `score_exercise`
  ADD CONSTRAINT `FKn9odwym5wtj3ki0sl9bnadhfm` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`),
  ADD CONSTRAINT `FKpluh2gaecaprs0e32dqu3g0jj` FOREIGN KEY (`exercise_id`) REFERENCES `exercise` (`id`);

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `FKk5m148xqefonqw7bgnpm0snwj` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `teacher`
--
ALTER TABLE `teacher`
  ADD CONSTRAINT `FKpb6g6pahj1mr2ijg92r7m1xlh` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
