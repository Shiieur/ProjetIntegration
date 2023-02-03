import { EntityType } from '../../interfaces';
import { getConnector } from '../ConnectDboz';
import { IImagesEntity } from './images.entity';

export const insertImage = async (imageEntity: IImagesEntity): Promise<number> => {
  const connector = getConnector();
  const imageIds = await connector('images').insert(imageEntity);
  return imageIds[0];
};

export const getImagesByRecipe = async (recipeIds: number[]): Promise<IImagesEntity[]> => {
  const connector = getConnector();
  const images = await connector
    .select('img.*')
    .from('images as img')
    .where('img.entityType', '=', EntityType.RECIPE)
    .whereIn('img.entityId', recipeIds);

  return images;
};

export const getImagesByIngredients = async (ingredientIds: number[]): Promise<IImagesEntity[]> => {
  const connector = getConnector();
  const images = await connector
    .select('img.*')
    .from('images as img')
    .where('img.entityType', '=', EntityType.INGREDIENT)
    .whereIn('img.entityId', ingredientIds);

  return images;
};

export const deleteImages = async (id: number, entityType: EntityType): Promise<number> => {
  const connector = getConnector();
  const result = await connector('images').where('entityId', id).andWhere('entityType', entityType).del();

  return result;
};
