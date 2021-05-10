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
-- Table structure for table `administrator`
--

DROP TABLE IF EXISTS `administrator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrator` (
  `adminID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `EmailID` varchar(45) NOT NULL,
  `PhoneNum` varchar(10) NOT NULL,
  `Address` varchar(300) DEFAULT 'Null',
  `DOB` varchar(30) NOT NULL,
  `Gender` varchar(45) NOT NULL,
  `Password` varchar(500) NOT NULL,
  `role` int NOT NULL DEFAULT '3',
  `resettoken` varchar(500) NOT NULL DEFAULT 'N/A',
  `expiresin` varchar(45) NOT NULL DEFAULT 'N/A',
  PRIMARY KEY (`adminID`),
  UNIQUE KEY `EmailID_UNIQUE` (`EmailID`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrator`
--

LOCK TABLES `administrator` WRITE;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` VALUES (6,'Admin207','admin@207.com','9207251675','Home Name , India','2021-04-20T18:00:39.561Z','Male','$2b$10$1KaF.2IsEMVM69GXsfG7RefLrQeLzSj4b5t0NyyruHOf/yEkM4phq',3,'3d22b80bd069261a8d3d4aa696c2e709f8a60ca1a33297ad47785cdc2db4004a','1618681306721'),(28,'test_admin','admin@test.com','1234567890','testaddress','20/2/1999','male','$2b$10$5XL9EKDFW1xRk0w5A.FgJ.GGAKzM3a9IXDDF4bugIbZzsEPvCgM/u',3,'N/A','N/A');
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;
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
