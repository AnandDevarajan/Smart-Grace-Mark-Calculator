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
  `DOB` varchar(10) NOT NULL,
  `Gender` varchar(10) NOT NULL,
  `Branch` varchar(45) NOT NULL,
  `Batch` varchar(45) NOT NULL,
  `Degree` varchar(45) NOT NULL,
  `Password` varchar(300) NOT NULL,
  `role` int NOT NULL DEFAULT '1',
  `Requested` varchar(45) NOT NULL DEFAULT 'N/A',
  `GraceDesc` varchar(45) NOT NULL DEFAULT 'N/A',
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
INSERT INTO `student` VALUES ('1234','Abc','abc@123.com','1234567890','eArTh','12/23/12','','CSE','','BTech','$2b$10$28dhc6ii84jKajtmwLxQNO75g/ARfOXt23vXcdn0rYTLmdMp9HTbW',1,'N/A','N/A'),('207','Anand','anand@207.com','1111111111','sadsadsdadsa addas','11/11/11','','CSE','C','BTech','$2b$10$VGRQJveCynTfWHX9aZR/A.NGMuy592AV/QtG8NTMfYx1cHppUmWxq',1,'N/A','N/A'),('CB.EN.U4CSE18207','Anand Devarajan','anand@123.com','9207251675','Earth,Solar System','777711171','','CSE','','BTech','$2b$10$JQOQ0HNDZ3Siv235xC46SOZwPjiNUaX8.LtrmJ/.hZPKs8yzIXAPm',1,'pending','NSS'),('das12223','adsads','asddsa@22.com','1111111111','sdasd ads','111111','Female','CSE','A','BTech','$2b$10$1umV/LJViml.hfti/3yUXOjuocJP27R13HmFTvJknIu1/y91Ctxj2',1,'N/A','N/A'),('dsa','asddas','asd@123.com','sad','sda','das','','CSE','','BTech','$2b$10$R2wzNxp0QdKfDGSQQXZz1e7YyaelIlyPFOlxTmvu/76.ZsaiI5U96',1,'N/A','N/A'),('dsads','asdbksjand','asddsa@123.com','123456789','sdsad','12/21/22','','CSE','','BTech','$2b$10$nPwjdYhnqujAz00oYCrFTOdM03FZY0wnK6MrkXHzbafPvNx7BQLYi',1,'N/A','N/A'),('sadsaddas','dsa','ads@1233.com','saddsa','adsdsa','asddsa','','CSE','','BTech','$2b$10$Msx9HCUeonjO5iL1nFYizuWot.xY/WnoY5RlQL9CkS3wE2upZXywW',1,'N/A','N/A');
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

-- Dump completed on 2021-03-02 19:48:14
