-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: grace_marks
-- ------------------------------------------------------
-- Server version	8.0.21

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
  `DOB` varchar(20) NOT NULL,
  `Gender` varchar(45) NOT NULL,
  `Department` varchar(45) NOT NULL,
  `CourseID` varchar(45) NOT NULL,
  `Password` varchar(500) NOT NULL,
  `ClassAdviser` varchar(10) NOT NULL,
  `Batch` varchar(45) NOT NULL DEFAULT 'N/A',
  `role` int NOT NULL DEFAULT '2',
  PRIMARY KEY (`FacultyID`),
  UNIQUE KEY `FacultyID_UNIQUE` (`FacultyID`),
  UNIQUE KEY `EmailID_UNIQUE` (`EmailID`),
  KEY `CID_idx` (`CourseID`),
  CONSTRAINT `CID` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculty`
--

LOCK TABLES `faculty` WRITE;
/*!40000 ALTER TABLE `faculty` DISABLE KEYS */;
INSERT INTO `faculty` VALUES (6,'dsa','ads@123','1','1','1','Male','CSE','15CSE213','$2b$10$QruKp1UF2cETey8udjp9tOreFaDPcwqs55kqKsU8JkeU4iAkeisvy','Yes','B',2),(7,'faculty2','faculty2@123.com','1111111111','111','11111','Male','CSE','15CSE312','$2b$10$4IJIGR3IDp3z9XWZAHW.l.exwREEHcBLwHluvYI5XGWqacPTnTiGi','No','N/A',2),(8,'faculty1','faculty@1.com','9207251675','Earth','12/12/21','male','CSE','15CSE302','$2b$10$0UAQtESyIUOfQgcgcZz7a.Tcobje/9bKSQ1c4lo5D90BUNET150nK','No','N/A',2);
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

-- Dump completed on 2021-03-02 19:48:14
