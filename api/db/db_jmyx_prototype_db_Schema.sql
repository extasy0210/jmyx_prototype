--
-- Database: `jmyx_prototype_db`
--

CREATE DATABASE IF NOT EXISTS `jmyx_prototype_db`;
USE `jmyx_prototype_db`;


-- ENTITIES

--
-- Struttura della tabella `courses`
--

CREATE TABLE IF NOT EXISTS `courses` (
	`class_time` date ,
	`create_time` date  NOT NULL,
	`level` varchar(130)  NOT NULL,
	`name` varchar(130)  NOT NULL,
	`update_time` date  NOT NULL,
	
	`_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT 

);


--
-- Struttura della tabella `students`
--

CREATE TABLE IF NOT EXISTS `students` (
	`age` int  NOT NULL,
	`class_count` int  NOT NULL,
	`course_id` int  NOT NULL,
	`create_time` date  NOT NULL,
	`isTrial` bool  NOT NULL,
	`name` varchar(130)  NOT NULL,
	`nick_name` varchar(130) ,
	`update_time` date  NOT NULL,
	
	`_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT 

);


--
-- Struttura della tabella `teachers`
--

CREATE TABLE IF NOT EXISTS `teachers` (
	`create_time` date  NOT NULL,
	`name` varchar(130)  NOT NULL,
	`update_time` date  NOT NULL,
	
	`_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT 

);


--
-- Struttura della tabella `user`
--

CREATE TABLE IF NOT EXISTS `user` (
	`mail` varchar(130) ,
	`name` varchar(130) ,
	`password` varchar(130)  NOT NULL,
	`roles` varchar(130) ,
	`surname` varchar(130) ,
	`username` varchar(130)  NOT NULL,
	
	`_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT 

);


-- Security

ALTER TABLE `user` MODIFY COLUMN `password` varchar(128)  NOT NULL;

INSERT INTO `jmyx_prototype_db`.`user` (`username`, `password`, `_id`) VALUES ('admin', '62f264d7ad826f02a8af714c0a54b197935b717656b80461686d450f7b3abde4c553541515de2052b9af70f710f0cd8a1a2d3f4d60aa72608d71a63a9a93c0f5', 1);

CREATE TABLE IF NOT EXISTS `roles` (
	`role` varchar(30) ,
	
	-- RELAZIONI

	`_user` int(11)  NOT NULL REFERENCES user(_id),
	`_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT 

);
INSERT INTO `jmyx_prototype_db`.`roles` (`role`, `_user`, `_id`) VALUES ('ADMIN', '1', 1);





-- relation m:m student_course Students - Courses
CREATE TABLE IF NOT EXISTS `Students_student_course` (
    `_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `id_Students` int(11)  NOT NULL REFERENCES students(_id),
    `id_Courses` int(11)  NOT NULL REFERENCES courses(_id)
);

-- relation 1:m teacher_class Teachers - Courses
ALTER TABLE `teachers` ADD COLUMN `teacher_class` int(11)  REFERENCES courses(_id);


