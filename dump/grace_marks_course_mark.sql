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
  PRIMARY KEY (`RollNum`,`CourseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_mark`
--

LOCK TABLES `course_mark` WRITE;
/*!40000 ALTER TABLE `course_mark` DISABLE KEYS */;
INSERT INTO `course_mark` VALUES ('anand123','15CSE201','N/P','N/P','N/P','N/P','N/P'),('anand123','15CSE213','30','70','100','N/P','N/P'),('anand123','15CSE302','N/P','N/P','N/P','N/P','N/P'),('anand123','15CSE312','N/P','N/P','N/P','N/P','N/P'),('anand123','15CSE313','N/P','N/P','N/P','N/P','N/P'),('CB.EN.U4CSE18207','15CSE201','32','44','76','N/P','N/P'),('CB.EN.U4CSE18207','15CSE213','N/P','N/P','N/P','N/P','N/P'),('CB.EN.U4CSE18207','15CSE302','32','45','62','N/P','N/P'),('CB.EN.U4CSE18207','15CSE312','20','32','52','N/P','N/P'),('CB.EN.U4CSE18207','15CSE313','40','32','72','N/P','N/P'),('CB.EN.U4CSE18224','15CSE201','32','39','71','N/P','N/P'),('CB.EN.U4CSE18224','15CSE213','45','38','83','N/P','N/P'),('CB.EN.U4CSE18224','15CSE302','34','40','74','N/P','N/P'),('CB.EN.U4CSE18224','15CSE312','40','45','85','N/P','N/P'),('CB.EN.U4CSE18224','15CSE313','34','40','74','N/P','N/P'),('CB.EN.U4CSE18243','15CSE201','38','33','71','N/P','N/P'),('CB.EN.U4CSE18243','15CSE213','45','38','83','N/P','N/P'),('CB.EN.U4CSE18243','15CSE302','31','45','76','N/P','N/P'),('CB.EN.U4CSE18243','15CSE312','32','40','72','N/P','N/P'),('CB.EN.U4CSE18243','15CSE313','32','44','76','N/P','N/P'),('CB.EN.U4CSE18245','15CSE201','40','45','85','N/P','N/P'),('CB.EN.U4CSE18245','15CSE213','45','50','95','N/P','N/P'),('CB.EN.U4CSE18245','15CSE302','43','35','78','N/P','N/P'),('CB.EN.U4CSE18245','15CSE312','38','35','73','N/P','N/P'),('CB.EN.U4CSE18245','15CSE313','32','38','70','N/P','N/P'),('CB.EN.U4CSE18253','15CSE201','42','45','87','N/P','N/P'),('CB.EN.U4CSE18253','15CSE213','44','44','88','N/P','N/P'),('CB.EN.U4CSE18253','15CSE302','40','34','74','N/P','N/P'),('CB.EN.U4CSE18253','15CSE312','38','43','81','N/P','N/P'),('CB.EN.U4CSE18253','15CSE313','45','30','75','N/P','N/P'),('sdsdsdsdsdsdsdsd','15CSE201','N/P','N/P','N/P','N/P','N/P'),('sdsdsdsdsdsdsdsd','15CSE213','N/P','N/P','N/P','N/P','N/P'),('sdsdsdsdsdsdsdsd','15CSE302','N/P','N/P','N/P','N/P','N/P'),('sdsdsdsdsdsdsdsd','15CSE312','N/P','N/P','N/P','N/P','N/P'),('sdsdsdsdsdsdsdsd','15CSE313','N/P','N/P','N/P','N/P','N/P'),('test','15CSE201','N/P','N/P','N/P','N/P','N/P'),('test','15CSE213','N/P','N/P','N/P','N/P','N/P'),('test','15CSE302','N/P','N/P','N/P','N/P','N/P'),('test','15CSE312','N/P','N/P','N/P','N/P','N/P'),('test','15CSE313','N/P','N/P','N/P','N/P','N/P');
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

-- Dump completed on 2021-04-20 14:44:52
