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
-- Table structure for table `course_mark`
--

DROP TABLE IF EXISTS `course_mark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_mark` (
  `RollNum` varchar(30) NOT NULL DEFAULT 'N/A',
  `CourseID` varchar(45) NOT NULL DEFAULT 'N/A',
  `Internals` varchar(45) NOT NULL DEFAULT 'N/P',
  `Marks` varchar(45) NOT NULL DEFAULT 'N/P',
  `Total` varchar(45) NOT NULL DEFAULT 'N/P',
  `Status` varchar(45) NOT NULL DEFAULT 'N/P',
  `Grade` varchar(45) NOT NULL DEFAULT 'N/P',
  `Final_Grade` varchar(45) NOT NULL DEFAULT 'N/P',
  `Final_status` varchar(45) NOT NULL DEFAULT 'N/P',
  PRIMARY KEY (`RollNum`,`CourseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_mark`
--

LOCK TABLES `course_mark` WRITE;
/*!40000 ALTER TABLE `course_mark` DISABLE KEYS */;
INSERT INTO `course_mark` VALUES ('CB.EN.U4CSE18207','15CSE201','32','12','44','P','B','B','N/P'),('CB.EN.U4CSE18207','15CSE213','12','32','44','P','B','B','N/P'),('CB.EN.U4CSE18207','15CSE302','43','32','75','P','A+','A+','N/P'),('CB.EN.U4CSE18207','15CSE312','34','32','66','P','A','A','N/P'),('CB.EN.U4CSE18207','15CSE313','32','43','75','P','O','O','N/P'),('test1','15CSE201','34','32','66','P','A','A','N/P'),('test1','15CSE213','43','45','88','P','O','O','N/P'),('test1','15CSE302','45','43','88','P','O','O','N/P'),('test1','15CSE312','34','50','84','P','O','O','N/P'),('test1','15CSE313','34','45','79','P','O','O','N/P'),('test2','15CSE201','45','34','79','P','O','O','P'),('test2','15CSE213','32','32','64','P','B+','B+','P'),('test2','15CSE302','34','32','27','P','F','P','P'),('test2','15CSE312','23','45','68','P','A','A','P'),('test2','15CSE313','32','43','78','P','O','O','P');
/*!40000 ALTER TABLE `course_mark` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-10 21:39:03
