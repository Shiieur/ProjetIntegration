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
-- Table structure for table `ingredients`
--

DROP TABLE IF EXISTS `ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredients` (
  `ingredientId` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `alcoholic` int NOT NULL,
  `isDeleted` int NOT NULL,
  PRIMARY KEY (`ingredientId`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredients`
--

LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
INSERT INTO `ingredients` VALUES (2,'Jus de citron vert',0,0),(3,'Vodka',1,0),(6,'Menthe',0,0),(10,'Citron Vert',0,0),(11,'Bière au gingembre',1,0),(12,'Glaçon',0,0),(13,'Rhum blanc',1,0),(14,'Sirop de sucre de canne',0,0),(15,'Eau pétillante',0,0),(16,'Tequila',1,0),(17,'Triple sec',1,0),(18,'Sel fin',0,0),(19,'Amaretto',1,0),(20,'Jus de citron',0,0),(21,'Cerise',0,0),(22,'Gin',1,0),(23,'Tonic',0,0),(24,'Citron',0,0),(25,'Jus de cranberry',0,0),(26,'Pomme de terre',0,0),(27,'Sauce barbecue',0,0),(28,'Gouda',0,0),(29,'Oignon',0,0),(30,'Reblochon',0,0),(31,'Huile',0,0),(32,'Poivre',0,0),(33,'Lardons',0,0),(34,'Gousse d\'aïl',0,0),(35,'Beurre',0,0),(36,'Chili en poudre',0,0),(37,'Poudre de cumin',0,0),(38,'Haricots rouges',0,0),(39,'Bouillon de boeuf',0,0),(40,'Persil plat',0,0),(41,'Boeuf haché',0,0),(42,'Concentré de tomate',0,0),(43,'Pain de mie',0,0),(44,'Gruyère râpé',0,0),(45,'Jambon',0,0),(46,'Toastinette',0,0),(47,'Lait',0,0),(48,'Noix de muscade',0,0),(49,'Oeuf',0,0),(50,'Maïs',0,0),(51,'Sucre roux',0,0);
/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;
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
