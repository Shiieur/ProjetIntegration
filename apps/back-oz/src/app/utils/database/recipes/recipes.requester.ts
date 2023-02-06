import { IRecipe } from '../../interfaces';
import { getConnector } from '../ConnectDboz';
import { IFullRecipeEntity, IRecipeEntity } from './recipes.entity';

export const insertRecipe = async (recipeEntity: IRecipeEntity): Promise<number> => {
  const connector = getConnector();
  const recipeIds = await connector('recipes').insert(recipeEntity);
  return recipeIds[0];
};

export const getAllFullRecipes = async (recipeIds?: number[]): Promise<IFullRecipeEntity[]> => {
  const connector = getConnector();
  const fullRecipes = await connector
    .select(
      'rec.recipeId as recipe_recipeId',
      'rec.name as recipe_name',
      'rec.steps as recipe_steps',
      'rec.quantity as recipe_quantity',
      'rec.type as recipe_type',
      'rec.tags as recipe_tags',
      'i.ingredientId as ingredient_id',
      'ri.recipeIngredientQuantity as ingredient_quantity',
      'ri.recipeIngredientUnitId as ingredient_unitId',
      'u.name as ingredient_unitName',
      'i.name as ingredient_name',
      'i.alcoholic as ingredient_isAlcoholic',
      'author.email as author_email',
      'author.username as author_username',
      'author.profilePicture as author_profilePicture',
      'author.userId as author_userId'
    )
    .from<IRecipe>('recipes as rec')
    .leftJoin('recipes_ingredients as ri', 'rec.recipeId', 'ri.recipeId')
    .leftJoin('ingredients as i', 'i.ingredientId', 'ri.ingredientId')
    .leftJoin('units as u', 'u.unitId', 'ri.recipeIngredientUnitId')
    .innerJoin('users as author', 'rec.authorId', 'author.userId')
    .modify(function (queryBuilder) {
      if (recipeIds) {
        queryBuilder.whereIn('rec.recipeId', recipeIds);
      }
    })
    .orderBy('rec.recipeId', 'desc');
    // console.log(fullRecipes)

  return fullRecipes;
};

export const updateRecipe = async (recipeEntity: IRecipeEntity, recipeId: number): Promise<number> => {
  const connector = getConnector();
  const result = await connector('recipes').where('recipeId', recipeId).update(recipeEntity).from<IRecipe>('recipes');

  return result;
};

export const deleteRecipes = async (ids: number[]): Promise<number> => {
  const connector = getConnector();
  const result = await connector.whereIn('recipeId', ids).del().from<IRecipe>('recipes');

  return result;
};
