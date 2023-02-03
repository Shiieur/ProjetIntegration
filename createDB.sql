CREATE DATABASE Dboz;
USE Dboz;

CREATE TABLE `ingredients` (
  `ingredientId` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alcoholic` int NOT NULL,
  `isDeleted` int NOT NULL,
  PRIMARY KEY (`ingredientId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `recipes` (
  `recipeId` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `steps` varchar(9999) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int DEFAULT 1 COMMENT 'for the number of person', 
  `type` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'drink or meal',
  `authorId` int NOT NULL COMMENT 'used to get user informations, userId FK on table users',
  `tags`  varchar(500) COLLATE utf8mb4_unicode_ci,  
  PRIMARY KEY (`recipeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `users` (
  `userId` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profilePicture` varchar(500) COLLATE utf8mb4_unicode_ci,  
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `recipes_ingredients` (
  `recipeId` int NOT NULL COMMENT 'recipes table FK',
  `ingredientId` int NOT NULL COMMENT 'ingredients table FK',
  `recipeIngredientQuantity` float DEFAULT NULL COMMENT 'quantity of an ingredient linked to its recipe',
  `recipeIngredientUnitId` int DEFAULT NULL COMMENT 'the unit of the linked ingredient ex: ounce, unit table FK'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `bookmarks` (
  `userId` int NOT NULL COMMENT 'user table FK',
  `recipeId` int NOT NULL COMMENT 'recipe table FK'  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `images` (
  `entityId` int NOT NULL COMMENT 'id of the recipe or ingredient',
  `entityType`  varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'type = recipe or ingredient',
  `url`  varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `units` (
  `unitId` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`unitId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `ingredients` (name, alcoholic, isDeleted)
VALUES 
('Bourbon Whiskey', 1, 0), 
('Lemon Juice', 0, 0), 
('Lime Juice', 0, 0), 
('Maple Syrup', 0, 0), 
('Amareto', 1, 0), 
('Egg', 0, 0),
('White Rum', 1, 0), 
('Mint', 0, 0), 
('Sparkling Water', 0, 0),
('Tequila', 1, 0), 
('Cointreau', 1, 0),
('Vodka', 1, 0), 
('Ginger Beer', 1, 0),
('Gin', 1, 0),
('Tonic', 0, 0),
('Cranberry Juice', 0, 0),
('Lime', 0, 0),
('Sea Salt', 0, 0),
('Angostura', 1, 0),
('Dijon Mustard', 0, 0), 
('Parmesan', 0, 0), 
('Chives', 0, 0),
('Garlic', 0, 0),
('Salt', 0, 0), 
('Black Pepper', 0, 0),
('Broccoli', 0, 0),
('Carrots', 0, 0),
('Olive Oil', 0, 0),
('Unsalted Butter', 0, 0),
('Butter', 0, 0),
('Onion', 0, 0), 
('Red Bell Pepper', 0, 0), 
('Green Bell Pepper', 0, 0),
('Yellow Bell Pepper', 0, 0),
('Zucchini', 0, 0), 
('Yellow Squash', 0, 0),
('Macaroni', 0, 0),
('Flour', 0, 0),
('Milk', 0, 0),
('Cheddar', 0, 0),
('White Bread', 0, 0), 
('Salmon', 0, 0),
('Breadcrumbs', 0, 0);

INSERT INTO `recipes` (name, steps, quantity, type, authorId, tags)
VALUES 
('Amaretto Sour', 'Add the amaretto, bourbon, lemon juice, syrup, egg white, and bitters to a cocktail shaker without ice. Shake for 15 seconds./Add the ice to the cocktail shaker. Shake again for 30 seconds./ Strain the drink into a glass; the foam will collect at the top. Garnish with a cocktail cherry.', 1, 'Drink', 1, 'Amareto/Lemon Juice/Maple Syrup'), 
('Mojito', 'In a cocktail shaker, muddle the mint leaves./ Add the lime juice, simple syrup, and rum. Fill the cocktail shaker with ice and shake until cold./ Place ice into a glass, and strain in the liquid. Top off the glass with soda water. Garnish with additional mint leaves.', 1, 'Drink', 1, 'Mint/White Rum/Lime Juice'),
('Margarita', 'Cut a notch in a lime wedge, then run the lime around the rim of a glass. Dip the edge of the rim into a plate of salt./ Place all ingredients in a cocktail shaker with 4 ice cubes and shake until cold./ Strain the margarita into the glass with the salted rim. Fill the glass with ice and serve.', 1, 'Drink', 1, 'Tequila/Cointreau/Lime Juice'),
('Moscow Mule', 'Pour the vodka, lime juice, and ginger beer into a copper mug./ Add ice and garnish with a lime slice. Serve immediately.', 1, 'Drink', 1, 'Vodka/Lime Juice/Ginger Beer'), 
('Gin Tonic', 'Add lots of ice to a large cocktail or wine glass and stir to chill the glass. Drain any melted water./ Pour in the gin. Add the garnishes. Pour the tonic water onto a bar spoon into the glass (to increase the bubbles). Stir once and serve.', 1, 'Drink', 1, 'Gin/Tonic/Lime'),
('Cosmopolitan', 'Place the vodka, cranberry juice, Cointreau, lemon juice, and syrup in a cocktail shaker with ice. Shake 15 seconds until cold. Strain the liquid into a martini glass./ Squeeze with the lime wedge and serve, garnished with a lime wheel if desired.', 1, 'Drink', 1, 'Vodka/Cranberry Juice/Cointreau'),
('Grain-Free Broccoli Fritters', 'Combine eggs and mustard in a bowl; stir until well blended. Mix in Parmesan cheese, chives, garlic, salt, and pepper./ Add chopped broccoli and shredded carrots; stir until ingredients are evenly mixed together./ Heat olive oil in a large skillet over medium heat./ Divide vegetable mixture into 8 equal portions and shape into 3 inch patties. Add to the hot oil in the skillet and cook until brown, 3 to 4 minutes. Reduce heat to medium-low, turn broccoli patties, and cook until brown, 3 to 4 more minutes./ Place patties on a warm serving platter and garnish with additional fresh chives, if desired. Serve immediately.', 8, 'Meal', 2, 'Broccoli/Parmesan/Dijon Mustard'), 
('Skillet Zucchini and Squash', 'Heat butter and olive oil together in a large non-stick skillet over medium-high heat. Add onion once butter is bubbly; cook and stir for 2 minutes. Add bell pepper and cook for 1 minute. Stir in yellow squash and zucchini slices. Season with salt and pepper. Cook, stirring, for about 3 minutes./ Stir in minced garlic and cook, stirring, about 1 minute. Keep cooking, stirring continuously, until squash has desired texture, 2 to 3 minutes./ Sprinkle with minced chives before serving.', 4, 'Meal', 2, 'Yellow Squash/Zucchini/Red Bell Pepper'),
('Air Fryer Scrambled Eggs On The Go', 'Lightly spray a ramekin dish with non-stick cooking spray. Pour in beaten eggs./ Set air fryer to 370 degrees F (185 degrees C) and place the ramekin into the air fryer basket./ Air fry for 3 minutes. Stir egg mixture and cook for 3 minutes more. Fluff with a fork and season to taste with salt and pepper. Grab and go.', 1, 'Meal', 2, 'Eggs/Salt/Pepper'),
('Simple Macaroni and Cheese', 'Bring a large pot of lightly salted water to a boil. Cook elbow macaroni in the boiling water, stirring occasionally until cooked through but firm to the bite, 8 minutes./ At the same time, melt butter in a saucepan over medium heat. Add flour, salt, and pepper and stir until smooth, about 5 minutes. Pour in milk slowly, while stirring continuously. Continue to cook and stir until mixture is smooth and bubbling, about 5 minutes, making sure the milk does not burn./ Add Cheddar cheese and stir until melted, 2 to 4 minutes./ Drain macaroni and fold into cheese sauce until coated.', 4, 'Meal', 2, 'Cheddar/Macaroni/Black Pepper'), 
('Grilled Cheese Sandwich', 'Preheat a nonstick skillet over medium heat. Generously butter one side of a slice of bread. Place bread butter-side down in the hot skillet; add 1 slice of cheese. Butter a second slice of bread on one side and place butter-side up on top of cheese./ Cook until lightly browned on one side; flip over and continue cooking until cheese is melted. Repeat with remaining 2 slices of bread, butter, and slice of cheese.', 2, 'Meal', 2, 'White Bread/Cheddar/Butter'),
('Baked Salmon Fillets Dijon', 'Preheat the oven to 400 degrees F (200 degrees C). Line a shallow baking pan with aluminum foil./ Place salmon fillets skin-side down on the prepared baking pan. Spread a thin layer of mustard on top of each fillet; season with salt and pepper. Top with bread crumbs, then drizzle with melted butter./ Bake in the preheated oven until salmon flakes easily with a fork, about 15 minutes.', 4, 'Meal', 2, 'Dijon Mustar/Salmon/Black Pepper');

INSERT INTO `users` (email, username)
VALUES 
('calvin.evrard@gmail.com', 'Calvin'), 
('paulo.ferreira@gmail.com', 'Paulo');

INSERT INTO `recipes_ingredients` (recipeId, ingredientId, recipeIngredientQuantity, recipeIngredientUnitId)
VALUES 
(1, 5, 3, 8), 
(1, 1, 1, 8), 
(1, 2, 2, 8), 
(1, 4, 1, 9), 
(1, 6, 1, 1), 
(1, 19, 2, 2),
(2, 8, 6, 4), 
(2, 3, 2, 8), 
(2, 4, 2, 8), 
(2, 7, 4, 8), 
(2, 9, 0.5, 10),
(3, 10, 3, 8), 
(3, 11, 2, 8), 
(3, 3, 1.5, 8), 
(3, 18, 5, 3), 
(3, 17, 1, 5),
(4, 12, 2, 7), 
(4, 3, 1, 8), 
(4, 13, 0.5, 10), 
(4, 17, 1, 5),
(4, 8, 3, 4),
(5, 14, 4, 8), 
(5, 15, 8, 8),
(6, 12, 2, 8),
(6, 16, 2, 8), 
(6, 11, 1, 8), 
(6, 2, 1, 8), 
(6, 17, 1, 5),
(6, 4, 1, 9),
(7, 6, 2, 1), 
(7, 20, 1, 9), 
(7, 21, 0.25, 10), 
(7, 22, 3, 4), 
(7, 23, 1, 11), 
(7, 24, 1, 9),
(7, 25, 0.5, 9), 
(7, 26, 2, 10), 
(7, 27, 1, 1), 
(7, 28, 2, 8),
(8, 29, 1, 8), 
(8, 28, 1, 8), 
(8, 31, 0.5, 1), 
(8, 32, 0.5, 1), 
(8, 35, 1, 1), 
(8, 36, 1, 1), 
(8, 24, 0.5, 9), 
(8, 25, 0.5, 9), 
(8, 23, 1, 11),
(9, 6, 2, 1), 
(9, 24, 0.5, 9), 
(9, 25, 0.5, 9),
(10, 37, 8, 7), 
(10, 30, 0.25, 10), 
(10, 38, 0.5, 10),
(10, 24, 0.5, 9), 
(10, 25, 0.5, 9),
(10, 39, 2, 10),
(10, 40, 2, 10),
(11, 41, 4, 6), 
(11, 30, 3, 8),
(11, 40, 2, 6),
(12, 42, 4, 12),
(12, 20, 3, 8), 
(10, 24, 0.5, 9), 
(10, 25, 0.5, 9),
(12, 43, 0.25, 10), 
(12, 30, 0.5, 10);

INSERT INTO `bookmarks` (userId, recipeId)
VALUES 
(1, 1), 
(1, 2), 
(1, 3), 
(2, 4), 
(2, 5), 
(2, 6),
(1, 7), 
(1, 8), 
(1, 9), 
(2, 10), 
(2, 11), 
(2, 12);
 
INSERT INTO `images` (entityId, entityType, url)
VALUES 
(1, 'Recipe', 'https://www.acouplecooks.com/wp-content/uploads/2020/03/Amaretto-Sour-017.jpg'),
(2, 'Recipe', 'https://www.acouplecooks.com/wp-content/uploads/2019/11/Mojito-Recipe-056.jpg'),
(3, 'Recipe', 'https://www.acouplecooks.com/wp-content/uploads/2020/03/Margarita-024.jpg'),
(4, 'Recipe', 'https://www.acouplecooks.com/wp-content/uploads/2019/06/Moscow-Mule-070.jpg'),
(5, 'Recipe', 'https://www.acouplecooks.com/wp-content/uploads/2020/03/Gin-and-Tonic-006.jpg'),
(6, 'Recipe', 'https://www.acouplecooks.com/wp-content/uploads/2019/12/Cosmopolitan-Cocktail-006.jpg'),
(7, 'Recipe', 'https://www.allrecipes.com/thmb/BV4DhQ3aLqonqqOsaH…itters-4x3-1-6f1aca37a12840cf9b95236fee6eb7fb.jpg'),
(8, 'Recipe', 'https://www.allrecipes.com/thmb/lbOvjeoHzYgphoXFkt…ble20Medley-719b2390cf764bd0b5f7d9ad2f7b1b63.jpeg'),
(9, 'Recipe', 'https://www.allrecipes.com/thmb/wxh1U6sYnU0WXrtS-z…ambled20Eggs-690553babe2d4fca8c43b506305374d3.jpg'),
(10, 'Recipe', 'https://www.allrecipes.com/thmb/RHILKup3NPxxZU9HRK…eese-mfs_008-7a50b284b67140919a0984093cb4611b.jpg'),
(11, 'Recipe', 'https://imagesvc.meredithcorp.io/v3/mm/image?url=h…F9136773.jpg&q=60&c=sc&orient=true&poi=auto&h=512'),
(12, 'Recipe', 'https://www.allrecipes.com/thmb/6zWlU6ojV9VN0vKiUpfOFHzgXm4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Baked-Salmon-Fillets-with-Dijon-Mustard-2000-23028416a7824c19b31ec4c851598111.jpg');

INSERT INTO `units` (name)
VALUES 
(''), 
('ml'), 
('g'), 
('leaf'),
('wedge'), 
('slice'), 
('ounce'), 
('tablespoon'),
('teaspoon'),
('cup'),
('fillet');