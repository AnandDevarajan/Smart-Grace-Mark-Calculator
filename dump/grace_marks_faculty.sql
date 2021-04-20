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
-- Table structure for table `faculty`
--

DROP TABLE IF EXISTS `faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faculty` (
  `FacultyID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `EmailID` varchar(45) NOT NULL,
  `PhoneNum` varchar(10) NOT NULL,
  `Address` varchar(300) DEFAULT NULL,
  `DOB` varchar(200) NOT NULL,
  `Gender` varchar(45) NOT NULL,
  `Department` varchar(45) NOT NULL,
  `CourseID` varchar(45) NOT NULL,
  `Password` varchar(500) NOT NULL,
  `ClassAdviser` varchar(10) NOT NULL,
  `Batch` varchar(45) NOT NULL DEFAULT 'N/A',
  `role` int NOT NULL DEFAULT '2',
  `resettoken` varchar(500) NOT NULL DEFAULT 'N/A',
  `expiresin` varchar(45) NOT NULL DEFAULT 'N/A',
  PRIMARY KEY (`FacultyID`),
  UNIQUE KEY `FacultyID_UNIQUE` (`FacultyID`),
  UNIQUE KEY `EmailID_UNIQUE` (`EmailID`),
  KEY `CID_idx` (`CourseID`),
  CONSTRAINT `CID` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculty`
--

LOCK TABLES `faculty` WRITE;
/*!40000 ALTER TABLE `faculty` DISABLE KEYS */;
INSERT INTO `faculty` VALUES (43,'Class Advisor C','faculty1@sgmc.com','8564738293','India','dd/mm/yy','Male','CSE','15CSE213','$2b$10$EXiBFQZLCQLYFzD9NACOJe5U7C3kXgNtttgD1/z8cpOuppk2zWjs6','Yes','C',2,'N/A','N/A'),(44,'Faculty2','faculty2@sgmc.com','6758439876','India','dd/mm/yyyyy','Male','CSE','15CSE201','$2b$10$z/ZFn1jUl3qD3x5IwNtxwuosJ05NRiTmedcqwQWe9NNGx7/1nCUTi','No','N/A',2,'N/A','N/A'),(45,'test_faculty','faculty2@test.com','1234567890','testaddress','20/2/1999','Male','CSE','15CSE313','$2b$10$kVSpTJTNKZiWnnSXrpFzg.erRU4v26hVRG8WXU2GJy4cHIGcK4Iom','No','N/A',2,'N/A','N/A'),(61,'erwd','asdsd@123.comda','sdsdsdsdsd','s','1998-09-17T18:30:00.000Z','Male','CSE','15CSE302','$2b$10$4IZrYy70j5cPjncKu7zrjO545v1MEAvgbFJ6qTjF.TnBAQSddqKTS','No','N/A',2,'N/A','N/A');
/*!40000 ALTER TABLE `faculty` ENABLE KEYS */;
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
