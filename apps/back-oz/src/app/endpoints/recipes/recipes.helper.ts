import { IImagesEntity } from '../../utils/database/images/images.entity';
import { IFullRecipeEntity } from '../../utils/database/recipes/recipes.entity';
import { IRecipe, IIngredient, IImage, RecipeType } from '../../utils/interfaces';
import _ from 'lodash';
import { getImagesByIngredients, getImagesByRecipe } from '../../utils/database/images/images.requester';

export const buildRecipeWithIngredientsAndImages = (
  recipe: IRecipe,
  ingredients: IIngredient[],
  images: IImage[],
  authorName: string
) => ({
  ...recipe,
  ingredients: ingredients,
  images: images,
  author: authorName,
});

//@TODO:
// Handle bookmarked
export const buildRecipeResponse = (
  recipes: IFullRecipeEntity[],
  recipeImages: IImagesEntity[],
  ingredientImages: IImagesEntity[]
) =>
  _.chain(recipes)
    .groupBy('recipe_recipeId')
    .map((groupedRecipes) => {
      const recipe = groupedRecipes[0];
      return {
        recipeId: recipe.recipe_recipeId,
        name: recipe.recipe_name,
        images: recipeImages.filter((image) => image.entityId === recipe.recipe_recipeId),
        bookmarked: false,
        steps: recipe.recipe_steps,
        quantity: recipe.recipe_quantity,
        type: recipe.recipe_type as RecipeType,
        author: recipe.author_username,
        tags: JSON.parse(recipe.recipe_tags),
        ingredients: buildIngredientResponse(groupedRecipes, ingredientImages),
      };
    })
    .value();

const buildIngredientResponse = (recipes: IFullRecipeEntity[], ingredientImages: IImagesEntity[]): IIngredient[] => {
  // If there is no ingredients, return an empty array
  if (recipes[0].ingredient_id === null) return [];

  return recipes.map((recipe) => ({
    ingredientId: recipe.ingredient_id,
    name: recipe.ingredient_name,
    quantity: recipe.ingredient_quantity,
    alcoholic: recipe.ingredient_isAlcoholic === 1,
    unit: {
      unitId: recipe.ingredient_unitId,
      name: recipe.ingredient_unitName,
    },
    image: ingredientImages.filter((image) => image.entityId === recipe.ingredient_id),
  }));
};

export const getRecipesImages = async (recipes: IFullRecipeEntity[]): Promise<IImagesEntity[]> => {
  const imageRecipeToFetch = recipes.map((recipe) => recipe.recipe_recipeId);
  const recipeImages = imageRecipeToFetch.length > 0 ? await getImagesByRecipe(imageRecipeToFetch) : [];

  return recipeImages;
};

export const getIngredientsImages = async (recipes: IFullRecipeEntity[]): Promise<IImagesEntity[]> => {
  // console.log('===>recipes');
  // console.log(JSON.stringify(recipes));

  const imageIngredientsToFetch = recipes.map((recipe) => recipe.ingredient_id);
  const ingredientImages =
    imageIngredientsToFetch.length > 0 ? await getImagesByIngredients(imageIngredientsToFetch) : [];
  // console.log('===i');
  // console.log(JSON.stringify(ingredientImages));

  return ingredientImages;
};
