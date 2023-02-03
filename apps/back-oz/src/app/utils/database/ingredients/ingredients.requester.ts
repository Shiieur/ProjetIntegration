import { IIngredient } from '../../interfaces';
import { getConnector } from '../ConnectDboz';
import { IIngredientEntity } from './ingredients.entity';

export const insertIngredient = async (ingredientEntity: IIngredientEntity): Promise<number> => {
  const connector = getConnector();
  const ingredientIds = await connector('ingredients').insert(ingredientEntity);
  return ingredientIds[0];
};

export const getIngredients = async (ingredientIds?: number[]): Promise<IIngredientEntity[]> => {
  const connector = getConnector();
  const ingredients = await connector
    .select()
    .from<IIngredient>('ingredients')
    .where('isDeleted', '=', 0)
    .modify(function (queryBuilder) {
      if (ingredientIds) {
        queryBuilder.whereIn('ingredients.ingredientId', ingredientIds);
      }
    })
    .orderBy('ingredients.ingredientId', 'desc');

  return ingredients;
};

export const updateIngredient = async (ingredientEntity: IIngredientEntity, ingredientId: number): Promise<number> => {
  const connector = getConnector();
  const result = await connector('ingredients').update(ingredientEntity).where('ingredientId', ingredientId);

  return result;
};

export const deleteIngredients = async (ids: number[]): Promise<number> => {
  const connector = getConnector();
  const result = await connector.whereIn('ingredientId', ids).del().from<IIngredient>('ingredients');

  return result;
};
