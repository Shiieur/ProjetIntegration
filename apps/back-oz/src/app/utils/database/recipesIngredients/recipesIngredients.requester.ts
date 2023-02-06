import { getConnector } from '../ConnectDboz';
import { IRecipesIngredientsEntity } from './recipesIngredients.entity';

export const insertRecipesIngredients = async (
  recipesIngredientsEntity: IRecipesIngredientsEntity
): Promise<number> => {
  const connector = getConnector();
  // console.log('recipesIngredientsEntity', recipesIngredientsEntity);
  const recipesingredientsIds = await connector('recipes_ingredients').insert(recipesIngredientsEntity);

  return recipesingredientsIds[0];
};

export const deleteRecipeIngredient = async (recipeId: number): Promise<number> => {
  const connector = getConnector();
  const result = await connector('recipes_ingredients').where('recipeId', recipeId).del();

  return result;
};
