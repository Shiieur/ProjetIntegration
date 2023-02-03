import { IIngredientEntity } from './../../utils/database/ingredients/ingredients.entity';
import { EntityType } from '../../utils/interfaces';
import { IngredientsCreateRequestDto } from './dto/requests/ingredientsCreateRequest.dto';
import { IngredientsUpdateRequestDto } from './dto/requests/ingredientsUpdateRequest.dto';
import { buildIngredientsWithImage, getIngredientsImages } from './ingredients.helper';
import { buildImageEntity } from '../../utils/database/images/images.entity';
import { buildIngredientEntity } from '../../utils/database/ingredients/ingredients.entity';
import {
  deleteIngredients,
  getIngredients,
  insertIngredient,
  updateIngredient,
} from '../../utils/database/ingredients/ingredients.requester';
import { HttpException, HttpStatus } from '@nestjs/common';
import { deleteImages, insertImage } from '../../utils/database/images/images.requester';
import { updateImage } from '../../utils/utils';

export class IngredientService {
  async create(dto: IngredientsCreateRequestDto) {
    console.log(`Going to create an ingredient using dto : ${JSON.stringify(dto)}`);
    const ingredient = buildIngredientEntity(dto);
    console.log(`Going to insert the ingredient entity : ${JSON.stringify(ingredient)}`);
    const ingredientId = await insertIngredient(ingredient);

    if (isNaN(ingredientId) || ingredientId <= 0) {
      throw new HttpException({ message: 'Ingredient could not be created' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    try {
      const imageEntity = buildImageEntity(ingredientId, EntityType.INGREDIENT, dto.imageUrl);
      console.log(`Going to insert the image entity : ${JSON.stringify(imageEntity)}`);
      await insertImage(imageEntity);
    } catch (error) {
      console.log(`Error catched: ${JSON.stringify(error)}`);
    }

    console.log(`Insertion was successfull, id inserted is: ${ingredientId}`);
    return ingredientId;
  }

  async getFullIngredients(ingredientsIds?: number[]) {
    const ingredients: IIngredientEntity[] = ingredientsIds
      ? await getIngredients(ingredientsIds)
      : await getIngredients();
    console.log(`Ingredients received from database are : ${JSON.stringify(ingredients)}`);
    const ingredientImages = await getIngredientsImages(ingredients);

    return buildIngredientsWithImage(ingredients, ingredientImages);
  }

  async delete(ids: number[]) {
    const deletedIngredients = await deleteIngredients(ids);
    if (isNaN(deletedIngredients) || deletedIngredients <= 0) {
      throw new HttpException({ message: 'Ingredient could not be deleted' }, HttpStatus.NOT_FOUND);
    }
    try {
      for (const id of ids) {
        await deleteImages(id, EntityType.INGREDIENT);
      }
    } catch (error) {
      console.log(error);
    }

    return { message: 'Ingredients deleted' };
  }

  async update(dto: IngredientsUpdateRequestDto, ingredientId: number) {
    console.log(`Going to create an ingredient using dto : ${JSON.stringify(dto)}`);
    const newIngredient = buildIngredientEntity(dto);
    console.log(`Going to update the ingredient entity : ${JSON.stringify(newIngredient)}`);
    const numberOfUpdatedRow = await updateIngredient(newIngredient, ingredientId);
    if (isNaN(numberOfUpdatedRow) || numberOfUpdatedRow <= 0) {
      throw new HttpException({ message: 'Ingredient could not be updated' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    await deleteImages(ingredientId, EntityType.INGREDIENT);
    await updateImage(ingredientId, dto.imageUrl, EntityType.INGREDIENT);

    console.log(`Update was successfull, update id inserted is: ${ingredientId}`);
    return ingredientId;
  }
}
