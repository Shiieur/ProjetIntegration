import { EntityType, IImage } from '../../interfaces';

// This is a representation of a database image table element
export interface IImagesEntity {
  entityId?: number;
  entityType: string;
  url: string;
}

export const buildImageEntity = (
  entityId: number,
  entityType: EntityType,
  url: string
): IImagesEntity => {
  const recipeEntity: IImagesEntity = {
    entityId: entityId, // This is the id of the entity type element
    entityType: entityType, // This tell us on which table the entityId can be found
    url: url,
  };

  return recipeEntity;
};
