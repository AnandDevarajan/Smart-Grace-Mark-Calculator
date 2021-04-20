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
INSERT INTO `student` VALUES ('anand123','test_student','student@test.com','1234567890','testaddress','20/2/1999','male','CSE','B','BTech','$2b$10$xPjuFGd9pvRVYuMQAKZ3MuTJ5r3S3qkGcNwmq3M3a62YYq63YPMHG',1,'N/A','N/A','N/A','N/A','N/A'),('CB.EN.U4CSE18207','Anand Devarjan','ananddevarajan01@gmail.com','9207251675','India','dd/mm/yyyy','Male','CSE','C','BTech','$2b$10$ff0/Hba7SmhJPfX31XBUQ.2y9ftiTg8ldR17df3ilaA1uRBAS5wAG',1,'pending','','SS','e0410399323b7c3fbf0ca7d2c14781da63738dc5ee49fb208388c5554b17ecf0','1618845837309'),('CB.EN.U4CSE18224','Hema','hemasrinivas1944@gmail.com','9059639421','India','dd/mm/yy','Female','CSE','C','BTech','$2b$10$TddBu0HcA5JArXOyWDf.TuQRXOTmtc.Y4WT99JGi2DgmtIVwq2FPy',1,'N/A','N/A','N/A','N/A','N/A'),('CB.EN.U4CSE18243','Yashwanth','yaswanthramponnada@gmail.com','8008565141','India','dd/mm/yy','Male','CSE','C','BTech','$2b$10$ujpWxIte4LzO8mbxJjAK8OU4Ia6ZEMJSe3eqG0hk8nXIV7Sl/ADZu',1,'N/A','N/A','N/A','N/A','N/A'),('CB.EN.U4CSE18245','Rohit Surya ','atinvento@gmail.com','9952952056','India','dd/mm/yy','Male','CSE','C','BTech','$2b$10$yID2eXvWnKvN5mYHYGelquxuGqWs0k0hETQontQ2gEFRysbX3Jupm',1,'pending','Inter University Sports and Games Eve','ts','N/A','N/A'),('CB.EN.U4CSE18253','Masthan','masthanmasthi037@gmail.com','6303191318','India','mm/dd/yy','Male','CSE','C','BTech','$2b$10$yNTcB1Oz0OeexTkNtds/v.9rPSeCsJxbk1QYusunAO73G0Zr4IMfO',1,'accepted','Disaster Relief Activit','es','N/A','N/A'),('test','test','test1@123.com','7584838293','India','dd/mm/yyyy','Male','CSE','A','BTech','$2b$10$LqAuNfyZirFwi9okD7cP9OIxzcWQyrSDJTRDw/Zw7mHY4MZAIvWye',1,'N/A','N/A','N/A','N/A','N/A');
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

-- Dump completed on 2021-04-20 14:44:52
