-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: grace_marks
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `RollNum` varchar(16) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `EmailID` varchar(45) NOT NULL,
  `PhoneNum` varchar(10) NOT NULL,
  `Address` varchar(300) DEFAULT NULL,
  `DOB` varchar(300) NOT NULL,
  `Gender` varchar(10) NOT NULL,
  `Branch` varchar(45) NOT NULL,
  `Batch` varchar(45) NOT NULL,
  `Degree` varchar(45) NOT NULL,
  `Password` varchar(300) NOT NULL,
  `role` int NOT NULL DEFAULT '1',
  `Requested` varchar(45) NOT NULL DEFAULT 'N/A',
  `GraceDesc` varchar(45) NOT NULL DEFAULT 'N/A',
  `GraceMark` varchar(45) NOT NULL DEFAULT 'N/A''',
  `resettoken` varchar(500) NOT NULL DEFAULT 'N/A',
  `expiresin` varchar(45) NOT NULL DEFAULT 'N/A',
  `cgpa` varchar(45) NOT NULL DEFAULT 'N/P',
  `cgpa_status` varchar(45) NOT NULL DEFAULT 'N/P',
  `final_cgpa` varchar(45) NOT NULL DEFAULT 'N/P',
  `final_status` varchar(45) NOT NULL DEFAULT 'N/P',
  `grace_status` varchar(45) NOT NULL DEFAULT 'N/P',
  PRIMARY KEY (`RollNum`),
  UNIQUE KEY `RollNum_UNIQUE` (`RollNum`),
  UNIQUE KEY `EmailID_UNIQUE` (`EmailID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES ('CB.EN.U4CSE18207','Anand Devarajan','cb.en.u4cse18207@cb.students.amrita.edu','9207251675','India','2021-06-11','Male','CSE','C','BTech','$2b$10$HqHF8WhLHtvEajP6xXmQA.0ASemmxY7O680X9HjJ6..FdVhEL9kGi',1,'accepted','Inter University Events','3','N/A','N/A','N/P','N/P','N/P','N/P','N/P'),('CB.EN.U4CSE18224','Hema Chowdary','cb.en.u4cse18224@cb.students.amrita.edu','9059639421','India','2021-06-11','Female','CSE','C','BTech','$2b$10$uWxhz0mwRnsrgc.JsziSxuwSCwN8LPVCZBQzq1.SooLzOD/OF4zsG',1,'N/A','N/A','N/A\'','N/A','N/A','N/P','N/P','N/P','N/P','N/P'),('CB.EN.U4CSE18243','Yaswanth Ram P','cb.en.u4cse18243@cb.students.amrita.edu','8008565141','India','2021-06-11','Male','CSE','C','BTech','$2b$10$1nJi8YXpgVrEO7H2G23R.ee0jUKUtf5J8lmsaKY.ZfyDlShLqe.Ka',1,'N/A','N/A','N/A\'','N/A','N/A','N/P','N/P','N/P','N/P','N/P'),('CB.EN.U4CSE18245','A T Rohit Surya','cb.en.u4cse18245@cb.students.amrita.edu','9952952056','India','2021-06-11','Male','CSE','C','BTech','$2b$10$mm5i3JBlIh8.swUjPxk/eeTyp/ZM2bpE7Mde6wp/jk2AqbdNQAm3u',1,'rejected','NSS','2','N/A','N/A','N/P','N/P','N/P','N/P','N/P'),('CB.EN.U4CSE18253','Mastan','cb.en.u4cse18253@cb.students.amrita.edu','6303191318','India','2021-06-11','Male','CSE','C','BTech','$2b$10$0Y3i/oRvVaTyGr/yYe/xCOenM6i6FWsqp16j7a.uWEkTYD9E3He8G',1,'N/A','N/A','N/A','N/A','N/A','N/P','N/P','N/P','N/P','N/P'),('STUDENTTEST12345','test student 1','student1@test.com','9847573849','India','2021-06-06','Male','CSE','E','BTech','$2b$10$RbSPbvN5aQf2BY5Cym9TteHCS8Qqif6XJNqpoPUzTnaYa2WCvtASa',1,'N/A','N/A','N/A','N/A','N/A','9.46','P','9.46','P','P');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-12 10:03:30
