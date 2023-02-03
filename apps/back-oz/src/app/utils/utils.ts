import { buildImageEntity } from './database/images/images.entity';
import { insertImage } from './database/images/images.requester';
import { EntityType } from './interfaces';

export const updateImage = async (id: number, imageUrl: string, entity: EntityType): Promise<number> => {
  try {
    const imageEntity = buildImageEntity(id, entity, imageUrl);
    console.log(`Going to insert the image entity : ${JSON.stringify(imageEntity)}`);
    const newId = await insertImage(imageEntity);
    return newId;
  } catch (error) {    
    console.log(`Error catched: ${JSON.stringify(error)}`);
    return null;
  }
};
