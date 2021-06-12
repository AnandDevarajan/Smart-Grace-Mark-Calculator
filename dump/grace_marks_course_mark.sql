-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: mysql-34147-0.cloudclusters.net    Database: grace_marks
-- ------------------------------------------------------
-- Server version	8.0.24

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
INSERT INTO `course_mark` VALUES ('CB.EN.U4CSE18207','15CSE201','23','34','57','P','O','O','P'),('CB.EN.U4CSE18207','15CSE213','23','42','65','P','O','O','P'),('CB.EN.U4CSE18207','15CSE302','22','31','53','P','B+','B+','P'),('CB.EN.U4CSE18207','15CSE312','34','42','76','P','A+','A+','P'),('CB.EN.U4CSE18207','15CSE313','31','20','51','P','B+','B+','P'),('CB.EN.U4CSE18224','15CSE201','20','31','51','P','A+','A+','N/P'),('CB.EN.U4CSE18224','15CSE213','20','20','40','P','B','B','N/P'),('CB.EN.U4CSE18224','15CSE302','32','20','52','P','B+','B+','N/P'),('CB.EN.U4CSE18224','15CSE312','33','24','57','P','B+','B+','N/P'),('CB.EN.U4CSE18224','15CSE313','39','29','68','P','A+','A+','N/P'),('CB.EN.U4CSE18243','15CSE201','33','21','54','P','O','O','N/P'),('CB.EN.U4CSE18243','15CSE213','23','33','56','P','A+','A+','N/P'),('CB.EN.U4CSE18243','15CSE302','31','30','61','P','A','A','N/P'),('CB.EN.U4CSE18243','15CSE312','28','31','59','P','B+','B+','N/P'),('CB.EN.U4CSE18243','15CSE313','36','41','77','P','O','O','N/P'),('CB.EN.U4CSE18245','15CSE201','21','21','42','P','A','A','N/P'),('CB.EN.U4CSE18245','15CSE213','32','43','75','P','O','O','N/P'),('CB.EN.U4CSE18245','15CSE302','29','32','61','P','A','A','N/P'),('CB.EN.U4CSE18245','15CSE312','43','39','82','P','O','O','N/P'),('CB.EN.U4CSE18245','15CSE313','34','20','54','P','B+','B+','N/P'),('CB.EN.U4CSE18253','15CSE201','23','28','53','P','A+','O','P'),('CB.EN.U4CSE18253','15CSE213','23','21','40','P','B','B','P'),('CB.EN.U4CSE18253','15CSE302','40','38','78','P','O','O','P'),('CB.EN.U4CSE18253','15CSE312','24','30','54','P','B+','B+','P'),('CB.EN.U4CSE18253','15CSE313','38','27','65','P','A','A','P'),('STUDENTTEST12345','15CSE201','N/P','N/P','24','P','N/P','P','P'),('STUDENTTEST12345','15CSE213','39','27','66','P','C','C','P'),('STUDENTTEST12345','15CSE302','N/P','N/P','77','P','N/P','A+','P'),('STUDENTTEST12345','15CSE312','N/P','N/P','N/P','P','N/P','N/P','P'),('STUDENTTEST12345','15CSE313','N/P','N/P','N/P','P','N/P','N/P','P');
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

-- Dump completed on 2021-06-11 23:36:19
