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
-- Table structure for table `recipes_ingredients`
--

DROP TABLE IF EXISTS `recipes_ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipes_ingredients` (
  `recipeId` int NOT NULL COMMENT 'recipes table FK',
  `ingredientId` int NOT NULL COMMENT 'ingredients table FK',
  `recipeIngredientQuantity` float DEFAULT NULL COMMENT 'quantity of an ingredient linked to its recipe',
  `recipeIngredientUnitId` int DEFAULT NULL COMMENT 'the unit of the linked ingredient ex: ounce, unit table FK'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes_ingredients`
--

LOCK TABLES `recipes_ingredients` WRITE;
/*!40000 ALTER TABLE `recipes_ingredients` DISABLE KEYS */;
INSERT INTO `recipes_ingredients` VALUES (12,15,1,10),(12,14,20,2),(12,13,40,2),(12,12,10,-1),(12,10,1,5),(12,6,6,4),(13,2,20,2),(13,10,1,-1),(13,16,40,2),(13,17,20,2),(13,18,1,8),(16,21,1,1),(16,20,20,2),(16,19,60,2),(16,14,10,2),(16,12,3,-1),(17,24,2,6),(17,23,80,2),(17,22,40,2),(17,12,3,-1),(11,2,30,2),(11,3,120,2),(11,6,2,4),(11,10,1,6),(11,11,240,2),(11,12,3,-1),(18,2,10,2),(18,3,40,2),(18,17,20,2),(18,24,1,6),(18,25,20,2),(19,28,30,3),(19,27,50,3),(19,26,5,-1),(20,34,1,-1),(20,33,200,3),(20,31,2,8),(20,30,1,-1),(20,29,200,3),(20,26,1000,3),(21,42,65,3),(21,41,500,3),(21,40,5,4),(21,39,300,2),(21,38,500,3),(21,37,2,9),(21,36,1,9),(21,35,50,3),(21,34,15,3),(21,32,1,12),(21,29,2,-1),(21,18,1,12),(22,48,1,12),(22,47,4,8),(22,46,8,6),(22,45,4,6),(22,44,100,3),(22,43,8,6),(22,35,50,3),(22,32,1,12),(22,18,1,12),(23,49,7,-1),(23,35,50,3),(23,32,1,12),(23,18,1,12),(24,50,50,3),(24,35,30,3),(24,31,2,8),(24,18,2,12);
/*!40000 ALTER TABLE `recipes_ingredients` ENABLE KEYS */;
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
