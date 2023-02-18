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
-- Table structure for table `recipes`
--

DROP TABLE IF EXISTS `recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipes` (
  `recipeId` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `steps` varchar(9999) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int DEFAULT '1' COMMENT 'for the number of person',
  `type` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'drink or meal',
  `authorId` int NOT NULL COMMENT 'used to get user informations, userId FK on table users',
  `tags` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`recipeId`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes`
--

LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;
INSERT INTO `recipes` VALUES (11,'Moscow Mule','Remplissez vos 2 gobelets avec de la glace. Versez dans chaque gobelet 60 ml de Vodka et 15 ml de jus de citron vert puis complétez chaque verre avec de la ginger beer. Mélangez légèrement puis décorez d’une rondelle de citron vert et d’un brin de menthe fraîche.',2,'Drink',1,'[\"Frais\",\"Été\",\"Menthe\"]'),(12,'Mojito','Mettez vos glaçons dans un torchon, refermez-le puis, à l\'aide d\'un rouleau à pâtisserie, pilez la glace. Vous pouvez encore avoir des morceaux. Versez dans un bol et réservez au congélateur. On ne déchire pas les feuilles de menthe car les huiles essentielles se situent sur la surface. Cela permet aussi de ne pas avoir de petits bouts de menthe qui vont bloquer la paille. On les dépose juste au fond du verre. Coupez le citron en deux puis chaque demi citron en 6 morceaux. Ajoutez les 6 morceaux de citron dans chaque verre (1/2 citron). Ajoutez le sirop de sucre de canne. Le fait d\'utiliser un sucre liquide permet de ne pas sentir les cristaux du sucre à la dégustation du cocktail.Ecrasez le citron avec un pilon spécial cocktail. Il est important que la menthe soit au fond du verre afin qu\'elle soit protégée à la fois par le sirop de sucre de canne et par les morceaux de citron.Ajoutez la glace pilée en laissant 2 cm de libre. Plus il y a de glace, moins elle fondra rapidement. Ajoutez le rhum. Complétez avec l\'eau gazeuse. Mélangez le cocktail afin que les saveur se mêlent. Le mojito se sert avec deux pailles qui vont permettre de mélanger le cocktail au fur et à mesure de la dégustation.',1,'Drink',1,'[\"Menthe\",\"Frais\",\"Citron Vert\"]'),(13,'Margarita','Givrez le bord du verre en passant un quartier de citron vert sur le pourtour, puis trempez-le dans une assiette avec du sel fin.   Versez tous les ingrédients dans un shaker avec des glaçons.  Secouez énergiquement puis filtrez le cocktail dans le verre.  Décorez avec un quartier de citron vert. Servez.',1,'Drink',1,'[\"Tequila\",\"Glamour\",\"Citron\"]'),(16,'Amaretto Sour','Réalisez la recette \"Amaretto Sour\" au shaker. Placez quelques glaçons dans le verre. Frappez les ingrédients au shaker avec des glaçons puis versez dans le verre en retenant la glace du shaker. Servir dans un verre de type \"old fashioned\". Décorer d\'un zeste de citron et éventuellement avec deux cerises à l\'eau de vie.',1,'Drink',2,'[\"Fruité\",\"Shaker\",\"Acide\"]'),(17,'Gin Tonic','Verser les glaçons directement dans le verre. Ajouter le gin et compléter avec le tonic. Ajouter une ou deux rondelles de citron et servir bien frais.',1,'Drink',2,'[\"Frais\",\"Gin\",\"Tonic\"]'),(18,'Cosmopolitan','Réalisez la recette \"Cosmopolitan\" au shaker. Frapper les ingrédients avec des glaçons et verser dans le verre en filtrant. Servir dans un verre de type \"verre à martini\". Eventuellement une rondelle de citron sur le bord du verre.',1,'Drink',2,'[\"Shaker\",\"Vodka\",\"Vacances\"]'),(19,'Poutine','Éplucher les pommes de terre et les couper en forme de frites. Faire frire les pommes de terre à 160-170°C et ensuite à 180-190°C durant 2 min.De préférence dans un bol pas trop haut (du style bol à pâtes), y mettre les frites, ajouter le fromage en grains et verser la sauce brune chaude.',2,'Meal',1,'[\"Canada\",\"Hiver\",\"Gourmant\"]'),(20,'Tartiflette','Eplucher les pommes de terre, les couper en dés, bien les rincer et les essuyer dans un torchon propre. Faire chauffer l\'huile dans une poêle, y faire fondre les oignons. Lorsque les oignons sont fondus, ajouter les pommes de terre et les faire dorer de tous les côtés. Lorsqu\'elles sont dorées, ajouter les lardons et finir de cuire. Éponger le surplus de gras avec une feuille de papier essuie-tout. D\'autre part, gratter la croûte du reblochon et le couper en deux (ou en quatre). Préchauffer le four à 200°C (thermostat 6-7) et préparer un plat à gratin en frottant le fond et les bords avec la gousse d\'ail épluchée. Dans le plat à gratin, étaler une couche de pommes de terre aux lardons, disposer dessus la moitié du reblochon, puis de nouveau des pommes de terre. Terminer avec le reste du reblochon (croûte vers les pommes de terre). Enfourner pour environ 20 minutes de cuisson.',4,'Meal',1,'[\"Fromage\",\"Hiver\",\"Fêtes\"]'),(21,'Chili Con Carne','Préchauffer le four à 180°C (thermostat 6). Hacher l\'oignon et l\'ail. Dans une cocotte en fonte, faire fondre le beurre, et ensuite dorer doucement l\'oignon et l’ail. Incorporer le boeuf haché et laisser cuire doucement 10 min. Mélanger le chili, le cumin, le concentré de tomates, et incorporer le tout au boeuf. Ajouter les haricots, le bouillon, du sel et du poivre. Couvrir et cuire 25 min au four.',4,'Meal',1,'[\"Épicé\",\"Chili\",\"Boeuf\"]'),(22,'Croque Monsieur','Beurrez les 8 tranches de pain de mie sur une seule face. Posez 1 tranche de fromage sur chaque tranche de pain de mie. Posez 1 tranche de jambon plié en deux sur 4 tranches de pain de mie. Recouvrez avec les autres tartines (face non beurrée au dessus). Dans un bol mélanger le fromage râpé avec le lait, le sel, le poivre et la muscade. Répartissez le mélange sur les croque-monsieur. Placez sur une plaque au four sous le grill pendant 10 mn.',4,'Meal',2,'[\"Pain\",\"Facile\",\"Délice\"]'),(23,'Omelette Nature','Battez les oeufs à la fourchette, salez et poivrez. Faites chauffer le beurre, versez-en un peu dans les oeufs et mélangez. Versez les oeufs dans la poêle à feu vif, baissez le feu et laissez cuire doucement en ramenant les bords de l\'omelette au centre au fur et à mesure qu\'ils prennent. Secouez un peu la poêle pour éviter que l\'omelette n\'attache, vérifiez la texture baveuse ou bien prise.  Pliez l\'omelette en deux et servez.',4,'Meal',2,'[\"Facile\",\"Pas Cher\",\"Protéïnes\"]'),(24,'Popcorn Salé','Faire chauffer l\'huile dans une casserole, quand elle est chaude, ajouter les grains de maïs. Quand le maïs commence à éclater, mettre le couvercle et laisser cuire 3 min en remuant la casserole. Retirer le couvercle, ajouter le beurre et le sel ou le sucre, bien mélanger et servir aussitôt.',4,'Meal',2,'[\"Cinéma\",\"Soirée\",\"Détente\"]');
/*!40000 ALTER TABLE `recipes` ENABLE KEYS */;
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
