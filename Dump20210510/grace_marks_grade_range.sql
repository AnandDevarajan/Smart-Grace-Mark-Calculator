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
-- Table structure for table `grade_range`
--

DROP TABLE IF EXISTS `grade_range`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grade_range` (
  `CourseID` varchar(45) NOT NULL DEFAULT 'N/P',
  `O` varchar(45) NOT NULL DEFAULT 'N/P',
  `Ap` varchar(45) NOT NULL DEFAULT 'N/P',
  `A` varchar(45) NOT NULL DEFAULT 'N/P',
  `Bp` varchar(45) NOT NULL DEFAULT 'N/P',
  `B` varchar(45) NOT NULL DEFAULT 'N/P',
  `C` varchar(45) NOT NULL DEFAULT 'N/P',
  `P` varchar(45) NOT NULL DEFAULT 'N/P',
  `F` varchar(45) NOT NULL DEFAULT 'N/P',
  `status` varchar(45) NOT NULL DEFAULT 'N/P',
  PRIMARY KEY (`CourseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grade_range`
--

LOCK TABLES `grade_range` WRITE;
/*!40000 ALTER TABLE `grade_range` DISABLE KEYS */;
INSERT INTO `grade_range` VALUES ('15CSE201','79-74','73 - 67',' 66- 59','58-51','50-39','38-31','30 - 23 ','22 - 0 ','N/P'),('15CSE213','88-82','81 - 75',' 74- 66','65-57','56-44','43-35','34 - 26 ','25 - 0 ','N/P'),('15CSE302','88-82','81 - 75',' 74- 66','65-57','56-44','43-35','34 - 26 ','25 - 0 ','N/P'),('15CSE312','84-78','77 - 72',' 71- 63','62-54','53-42','41-33','32 - 25 ','24 - 0 ','N/P'),('15CSE313','79-74','73 - 67',' 66- 59','58-51','50-39','38-31','30 - 23 ','22 - 0 ','N/P');
/*!40000 ALTER TABLE `grade_range` ENABLE KEYS */;
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
