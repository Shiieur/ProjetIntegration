import { EntityType } from './../../utils/interfaces';
import { RecipesCreateRequestDto } from './dto/requests/recipesCreateRequest.dto';
import { RecipesUpdateRequestDto } from './dto/requests/recipesUpdateRequest.dto';
import { buildRecipeResponse, getIngredientsImages, getRecipesImages } from './recipes.helper';
import { getUser } from '../../utils/database/users/users.requester';
import { buildRecipeEntity, IFullRecipeEntity } from '../../utils/database/recipes/recipes.entity';
import {
  deleteRecipes,
  getAllFullRecipes,
  insertRecipe,
  updateRecipe,
} from '../../utils/database/recipes/recipes.requester';
import { buildRecipesIngredientsEntity } from '../../utils/database/recipesIngredients/recipesIngredients.entity';
import {
  deleteRecipeIngredient,
  insertRecipesIngredients,
} from '../../utils/database/recipesIngredients/recipesIngredients.requester';
import { buildImageEntity } from '../../utils/database/images/images.entity';
import { deleteImages, insertImage } from '../../utils/database/images/images.requester';
import { HttpException, HttpStatus } from '@nestjs/common';
import { updateImage } from '../../utils/utils';

export class RecipeService {
  async create(dto: RecipesCreateRequestDto) {
    console.log(`Going to create a recipe using dto : ${JSON.stringify(dto)}`);

    // @TODO: This should come from the token
    const author = await getUser('Calvin');
    console.log(`Information on the author are : ${JSON.stringify(author)}`);

    const recipe = buildRecipeEntity(dto, author.userId);
    console.log(`Going to insert the recipe entity : ${JSON.stringify(recipe)}`);
    const recipeId = await insertRecipe(recipe);

    if (isNaN(recipeId) || recipeId <= 0) {
      throw new HttpException({ message: 'Recipe could not be created' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    try {
      for (const ingredientInfo of dto.ingredientsInfo) {
        const recipeIngredientEntity = buildRecipesIngredientsEntity(ingredientInfo, recipeId);
        console.log(`Going to insert the recipeIngredientEntity entity : ${JSON.stringify(recipeIngredientEntity)}`);
        await insertRecipesIngredients(recipeIngredientEntity);
      }

      for (const url of dto.imageUrls) {
        const imageEntity = buildImageEntity(recipeId, EntityType.RECIPE, url);
        console.log(`Going to insert the image entity : ${JSON.stringify(imageEntity)}`);
        await insertImage(imageEntity);
      }
    } catch (error) {      
      console.log(`Error catched: ${JSON.stringify(error)}`);
    }

    console.log(`Insertion was successfull, id inserted is: ${recipeId}`);
    return recipeId;
  }

  async getAll() {   
    const recipes: IFullRecipeEntity[] = await getAllFullRecipes();
    console.log(`Recipes received from database are : ${JSON.stringify(recipes)}`);
    const recipeImages = await getRecipesImages(recipes);
    const ingredientImages = await getIngredientsImages(recipes);

    return buildRecipeResponse(recipes, recipeImages, ingredientImages);
  }

  async getById(recipeIds: number[]) {
    const recipes: IFullRecipeEntity[] = await getAllFullRecipes(recipeIds);
    console.log(`Recipes received from database are : ${JSON.stringify(recipes)}`);
    const recipeImages = await getRecipesImages(recipes);
    const ingredientImages = await getIngredientsImages(recipes);

    return buildRecipeResponse(recipes, recipeImages, ingredientImages);
  }

  async delete(ids: number[]) {
    const deletedRecipes = await deleteRecipes(ids);
    if (isNaN(deletedRecipes) || deletedRecipes <= 0) {
      throw new HttpException({ message: 'Recipe could not be deleted' }, HttpStatus.NOT_FOUND);
    }

    try {
      for (const id of ids) {
        await deleteRecipeIngredient(id);
        await deleteImages(id, EntityType.RECIPE);
      }
    } catch (error) {
      console.log(error);
    }

    return { message: 'Recipe deleted' };
  }

  async update(dto: RecipesUpdateRequestDto, recipeId: number) {
    const author = await getUser('Calvin');
    const recipe = buildRecipeEntity(dto, author.userId);

    const result = await updateRecipe(recipe, recipeId);

    if (!isNaN(result)) {
      console.log(`Delete the old images of : ${recipeId}`);
      await deleteImages(recipeId, EntityType.RECIPE);
      for (const url of dto.imageUrls) {
        console.log(`Going to insert the image url : ${url}`);
        await updateImage(recipeId, url, EntityType.RECIPE);
      }

      console.log(`Delete the old ingredients links of : ${recipeId}`);
      await deleteRecipeIngredient(recipeId);
      for (const ingredientInfo of dto.ingredientsInfo) {
        const recipeIngredientEntity = buildRecipesIngredientsEntity(ingredientInfo, recipeId);
        console.log(`Going to insert the recipeIngredientEntity entity : ${JSON.stringify(recipeIngredientEntity)}`);
        await insertRecipesIngredients(recipeIngredientEntity);
      }
    }

    console.log(`Update was successfull, update id inserted is: ${recipeId}`);
    return recipeId;
  }
}
