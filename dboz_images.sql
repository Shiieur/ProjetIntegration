-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: dboz
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `entityId` int NOT NULL COMMENT 'id of the recipe or ingredient',
  `entityType` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'type = recipe or ingredient',
  `url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (3,'Ingredient','https://cdn-icons-png.flaticon.com/512/920/920522.png'),(1,'Recipe',''),(12,'Ingredient','https://cdn-icons-png.flaticon.com/512/2458/2458102.png'),(11,'Ingredient','https://cdn-icons-png.flaticon.com/512/3993/3993977.png'),(10,'Ingredient','https://cdn-icons-png.flaticon.com/512/4031/4031109.png'),(6,'Ingredient','https://cdn-icons-png.flaticon.com/512/7217/7217816.png'),(2,'Ingredient','https://cdn-icons-png.flaticon.com/512/167/167255.png'),(13,'Ingredient','https://cdn-icons-png.flaticon.com/512/2851/2851831.png'),(14,'Ingredient','https://cdn-icons-png.flaticon.com/512/5887/5887399.png'),(15,'Ingredient','https://cdn-icons-png.flaticon.com/512/2070/2070154.png'),(12,'Recipe','https://static.colruyt.be/culinair/BBQ%20gids%20vi0922/39%20mojito%20classic%20WEB_MR.jpg'),(12,'Recipe','https://img.cuisineaz.com/1024x1024/2013/12/20/i14978-recette-de-mojito.jpeg'),(16,'Ingredient','https://cdn-icons-png.flaticon.com/512/3983/3983200.png'),(17,'Ingredient','https://cdn-icons-png.flaticon.com/512/1943/1943747.png'),(18,'Ingredient','https://cdn-icons-png.flaticon.com/512/3387/3387326.png'),(19,'Ingredient','https://cdn-icons-png.flaticon.com/512/8583/8583590.png'),(20,'Ingredient','https://cdn-icons-png.flaticon.com/512/7703/7703719.png'),(13,'Recipe','https://assets.afcdn.com/recipe/20210216/117996_w1024h1024c1cx3976cy2652.jpg'),(13,'Recipe','https://hips.hearstapps.com/hmg-prod/images/how-to-make-a-margarita-1587501226.jpg'),(21,'Ingredient','https://cdn-icons-png.flaticon.com/512/135/135695.png'),(16,'Recipe','https://img.taste.com.au/ub6IwH0I/taste/2022/06/best-ever-amaretto-sour-179324-2.jpg'),(16,'Recipe','https://cdn.apartmenttherapy.info/image/upload/v1636399606/k/Photo/Recipe%20Ramp%20Up/2021-11-Amaretto-Sour/amaretto-sour-2.jpg'),(22,'Ingredient','https://cdn-icons-png.flaticon.com/512/3152/3152714.png'),(23,'Ingredient','https://cdn-icons-png.flaticon.com/512/2405/2405611.png'),(24,'Ingredient','https://cdn-icons-png.flaticon.com/512/2079/2079250.png'),(17,'Recipe','https://www.simplejoy.com/wp-content/uploads/2018/03/gin-and-tonic.jpg'),(17,'Recipe','https://www.supermarche-match.be/uploads/recipes/images/_1200x675_crop_center-center_none/Cocktail-Gin-Tonic-1920x750.jpg'),(25,'Ingredient','https://cdn-icons-png.flaticon.com/512/6055/6055240.png'),(11,'Recipe','https://resize.elle.fr/portrait_1280/var/plain_site/storage/images/elle-a-table/recettes-de-cuisine/cocktail-moscow-mule-1988856/21088454-7-fre-FR/Cocktail-Moscow-Mule.jpg'),(11,'Recipe','https://www.acouplecooks.com/wp-content/uploads/2019/06/Moscow-Mule-062.jpg'),(18,'Recipe','https://mixthatdrink.com/wp-content/uploads/2009/05/cosmopolitan-cocktail-2.jpg'),(18,'Recipe','https://assets.afcdn.com/recipe/20131025/31242_w1024h1024c1cx1900cy1266.jpg'),(26,'Ingredient','https://cdn-icons-png.flaticon.com/512/1135/1135548.png'),(27,'Ingredient','https://cdn-icons-png.flaticon.com/512/2755/2755304.png'),(28,'Ingredient','https://cdn-icons-png.flaticon.com/512/3510/3510616.png'),(19,'Recipe','https://assets.afcdn.com/recipe/20200622/112176_w1000h667c1cx2880cy1920cxb5760cyb3840.webp'),(19,'Recipe','https://assets.afcdn.com/recipe/20160401/727_w1000h1510c1cx1632cy2464.webp'),(30,'Ingredient','https://cdn-icons-png.flaticon.com/512/135/135651.png'),(29,'Ingredient','https://cdn-icons-png.flaticon.com/512/1790/1790392.png'),(31,'Ingredient','https://cdn-icons-png.flaticon.com/512/8118/8118976.png'),(32,'Ingredient','https://cdn-icons-png.flaticon.com/512/4711/4711342.png'),(33,'Ingredient','https://cdn-icons-png.flaticon.com/512/1759/1759146.png'),(34,'Ingredient','https://cdn-icons-png.flaticon.com/512/9708/9708470.png'),(20,'Recipe','https://assets.afcdn.com/recipe/20160401/38946_w1000h667c1cx2690cy1793.webp'),(20,'Recipe','https://assets.afcdn.com/recipe/20180705/80200_w1000h1333c1cxb3888cyb5184.webp'),(35,'Ingredient','https://cdn-icons-png.flaticon.com/512/2166/2166054.png'),(36,'Ingredient','https://cdn-icons-png.flaticon.com/512/3280/3280185.png'),(37,'Ingredient','https://cdn-icons-png.flaticon.com/512/4696/4696417.png'),(38,'Ingredient','https://cdn-icons-png.flaticon.com/512/2079/2079285.png'),(39,'Ingredient','https://cdn-icons-png.flaticon.com/512/628/628194.png'),(40,'Ingredient','https://cdn-icons-png.flaticon.com/512/7217/7217740.png'),(41,'Ingredient','https://cdn-icons-png.flaticon.com/512/7063/7063316.png'),(42,'Ingredient','https://cdn-icons-png.flaticon.com/512/2719/2719286.png'),(21,'Recipe','https://assets.afcdn.com/recipe/20211222/126214_w1000h668c1cx1124cy721cxb2119cyb1415.webp'),(21,'Recipe','https://assets.afcdn.com/recipe/20130128/23197_w1000h954c1cx878cy838.webp'),(43,'Ingredient','https://cdn-icons-png.flaticon.com/512/7093/7093198.png'),(44,'Ingredient','https://cdn-icons-png.flaticon.com/512/1143/1143205.png'),(45,'Ingredient','https://cdn-icons-png.flaticon.com/512/9367/9367660.png'),(46,'Ingredient','https://cdn-icons-png.flaticon.com/512/7219/7219954.png'),(47,'Ingredient','https://cdn-icons-png.flaticon.com/512/869/869460.png'),(48,'Ingredient','https://cdn-icons-png.flaticon.com/512/6113/6113260.png'),(22,'Recipe','https://assets.afcdn.com/recipe/20170112/28965_w1000h667c1cx1500cy1000.webp'),(22,'Recipe','https://assets.afcdn.com/recipe/20180706/80422_w1000h1333c1cxb3888cyb5184.webp'),(49,'Ingredient','https://cdn-icons-png.flaticon.com/512/532/532573.png'),(23,'Recipe','https://assets.afcdn.com/recipe/20220914/135098_w1000h662c1cx971cy709cxb2127cyb1409.webp'),(50,'Ingredient','https://cdn-icons-png.flaticon.com/512/1652/1652066.png'),(51,'Ingredient','https://cdn-icons-png.flaticon.com/512/5244/5244118.png'),(24,'Recipe','https://assets.afcdn.com/recipe/20220505/131757_w1000h668c1cx2120cy1416cxb4240cyb2832.webp'),(24,'Recipe','https://www.sharmispassions.com/wp-content/uploads/2017/02/Popcorn5-475x500.jpg');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-18 17:31:53
