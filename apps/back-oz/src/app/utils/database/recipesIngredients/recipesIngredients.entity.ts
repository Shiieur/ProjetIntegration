import { IRecipeIngredientsDto } from '../../interfaces';

// This is a representation of a database recipes_ingredients table element
export interface IRecipesIngredientsEntity {
  recipeId: number;
  ingredientId: number;
  recipeIngredientQuantity: number;
  recipeIngredientUnitId: number;
}

export const buildRecipesIngredientsEntity = (
  ingredientInfo: IRecipeIngredientsDto,
  recipeId: number
): IRecipesIngredientsEntity => {
  const recipeEntity: IRecipesIngredientsEntity = {
    recipeId: recipeId,
    ingredientId: ingredientInfo.ingredientId,
    recipeIngredientQuantity: ingredientInfo.quantity,
    recipeIngredientUnitId: ingredientInfo.unitId,
  };

  return recipeEntity;
};
