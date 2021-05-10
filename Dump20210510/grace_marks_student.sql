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
INSERT INTO `student` VALUES ('CB.EN.U4CSE18207','Anand Devarajan','ananddevarajan01@gmail.com','9207251675','India','2021-05-03','Male','CSE','C','BTech','$2b$10$9aEg/0..ne37AOLSziK5l.lA.QOC0a6Wf8xjEmx9IWbjjYLbdyu.W',1,'N/A','N/A','N/A','N/A','N/A','8.04','P','NaN','P'),('test1','test2','test1@sgmc.com','aaaaaaaaaa','a','2021-05-10','Male','CSE','C','BTech','$2b$10$A2wy/LO76GdSACF2R0r5F.Y6qjP7rBcspXED12DwOsZbv211cCwqa',1,'N/A','N/A','N/A','N/A','N/A','9.71','P','NaN','P'),('test2','test2','test2@sgmc.com','sdsdsdssds','s','2021-05-10','Female','CSE','C','BTech','$2b$10$Acicy1Y.0gLc5mu9X9/HOeUxVDW1oky1JOnThZGGb66Fi76qh7qFe',1,'accepted','Inter University Sports and Games Events','3','N/A','N/A','8.79','P','8.86','P');
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

-- Dump completed on 2021-05-10 16:17:42
