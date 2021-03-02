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
-- Table structure for table `gracemark`
--

DROP TABLE IF EXISTS `gracemark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gracemark` (
  `GraceMarkID` int NOT NULL AUTO_INCREMENT,
  `Description` varchar(45) NOT NULL,
  `GraceMark` varchar(45) NOT NULL,
  UNIQUE KEY `GraceMarkID_UNIQUE` (`GraceMarkID`),
  UNIQUE KEY `Desc_UNIQUE` (`Description`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gracemark`
--

LOCK TABLES `gracemark` WRITE;
/*!40000 ALTER TABLE `gracemark` DISABLE KEYS */;
INSERT INTO `gracemark` VALUES (40,'NSS','20'),(41,'Sports','100'),(45,'NSS1','2'),(46,'sad','2wq'),(49,'REw','sda'),(53,'q','s'),(56,'NSS100','w'),(57,'NSS500','FDS'),(58,'7','3'),(60,'23e','ds'),(61,'dsa','cxz'),(62,'szx','czsx'),(66,'23sdw','dsczx'),(67,'sac','cxz'),(75,'5yr','ry'),(76,'bb','cc'),(79,'ewads','ads'),(80,'dsaadscxz','xcz'),(83,'cxzcx','zcx'),(85,'GSDSF','SAD'),(88,'ra','sd'),(89,'SADSA','ASDSAD'),(90,'ASDDSA','ADSDAS'),(94,'2eaw','sad'),(95,'',''),(98,'GTT','ASDS'),(101,'SA','ADS'),(105,'RR','d'),(107,'bbxc','xczcz'),(108,'CZXCZ','CZXCZ'),(109,'SCZXXZC','ZASASD'),(112,'trtterw','ewrerer'),(114,'sczxczxc','weawea'),(115,'DSASCZX','ZXCZCX'),(118,'DSHDAKADIW','22ESQAWDSX'),(120,'GASDSADC','ZCZ'),(121,'kasdlksa','adxczc');
/*!40000 ALTER TABLE `gracemark` ENABLE KEYS */;
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
