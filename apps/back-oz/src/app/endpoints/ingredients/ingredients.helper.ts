import { IImagesEntity } from '../../utils/database/images/images.entity';
import { getImagesByIngredients } from '../../utils/database/images/images.requester';
import { IIngredientEntity } from '../../utils/database/ingredients/ingredients.entity';
import { IImage, IIngredient } from '../../utils/interfaces';


export const getIngredientsImages = async (ingredients: IIngredientEntity[]): Promise<IImagesEntity[]> => {  
  const imageIngredientsToFetch = ingredients.map((ingredient) => ingredient.ingredientId);
  const ingredientImages =
  imageIngredientsToFetch.length > 0 ? await getImagesByIngredients(imageIngredientsToFetch) : [];

  return ingredientImages;
};

export const buildIngredientsWithImage = (ingredients: IIngredientEntity[], images: IImagesEntity[]) => { 
  const ingredientsWithImage = ingredients.map((ingredient) => {    
    return {
      ...ingredient,
      image: images.filter(image => image.entityId === ingredient.ingredientId)
    }
  });  
  return ingredientsWithImage;
};