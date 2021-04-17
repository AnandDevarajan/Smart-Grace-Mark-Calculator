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
  `DOB` varchar(10) NOT NULL,
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
INSERT INTO `student` VALUES ('1','student0','s@123.com','9865432123','chennai','04/12/99','Male','CSE','C','BTech','$2b$10$G2aNAhiBTdlSLku9sy2H4Oh5g8hYwrNA7QzFXjDLFsX/MMa7jxjmS',1,'accepted','Inter University Sports and Games Events','15','N/A','N/A'),('anand123','anand','anand@123.com','1234567890','23231','11213','Male','CSE','C','BTech','$2b$10$.hika3MjPrh.A4ihuq.nYOvNsTcDTsegEEx5B9uBUMXWsjKdCd4.y',1,'accepted','Inter University Sports and Games Events','15','02db280ac35f3084db9b47a7d4c16e90760a38987c4b20a3f41b1beae4bc5688','1618681076819'),('anand2','anand2','anand2@123.com','anand2anan','anand2','anand2','Male','CSE','B','BTech','$2b$10$5thScYW6Qmwn.U0RwnZzLudZzFL3rSPErecZQymqne92Ov7wnmIQ6',1,'rejected','Inter University Sports and Games Events','15','N/A','N/A'),('student2','student2','student2@1234.com','4567890345','chennail ,TN','11/12/19','Female','CSE','B','BTech','$2b$10$qOn27.K/AKRd9SUz6SG/6uoDCQ8u6M2WFHc7glKLXiGbSApa3rFtG',1,'accepted','Inter University Sports and Games Events','15','N/A','N/A'),('student3','student3','student3@123.com','9856890567','asd 123 dsa','6/02/1999','Male','CSE','B','BTech','$2b$10$chvr8RHWGqHntRGvz3pzeOZDQEJmmcm3rdLDWrC074xfIOGOLDWqe',1,'rejected','Inter University Sports and Games Events','15','N/A','N/A'),('xxczzxc','sdad','asdasd@123.com','wwwwwwwwqw','qq','ewqe','Female','CSE','B','BTech','$2b$10$OUHff7hx7QcoB99fL4IvaecU/Hxsyt2QoCMbzP6yambgsHBbcmrFK',1,'N/A','Inter University Sports and Games Events','15','N/A','N/A');
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

-- Dump completed on 2021-04-17 23:10:29
