import { IRecipeFormik, IGetRecipe, RecipeType, IRecipeUpsert, IIngredient } from '../../../utils/interfaces';

export const buildRecipeFormik = (recipe: IGetRecipe): IRecipeFormik => {
  const { images = [], tags = [], ingredients, name, quantity, recipeId, steps, type } = recipe;
  const imagesFormik = images.map((image) => ({
    value: image.url,
    label: image.url,
  }));

  const tagsFormik = tags.map((tag) => ({
    value: tag,
    label: tag,
  }));

  const initialRecipe: IRecipeFormik = {
    recipeId: recipeId ?? -1,
    name: name ?? '',
    images: imagesFormik,
    steps: steps ?? '',
    quantity: quantity ?? -1,
    type: type ?? RecipeType.DRINK,
    tags: tagsFormik,
    ingredients: ingredients ?? [],
  };

  return initialRecipe;
};

export const buildRecipeUpsert = (recipe: IRecipeFormik): IRecipeUpsert => {
  const { images = [], tags = [], ingredients, name, quantity, recipeId, steps, type } = recipe;

  const imagesUpsert: string[] = images.map((image) => image.value);
  const tagsUpsert: string[] = tags.map((tag) => tag.value);
  const ingredientsUpsert: IIngredient[] = ingredients.map((ingredient) => {
    const { unit, ingredientId, quantity = 0, alcoholic, image, name } = ingredient;
    return {
      ingredientId: ingredientId,
      quantity: quantity,
      unitId: unit?.unitId ?? -1,
      alcoholic: alcoholic,
      image: image,
      name: name,
    };
  });

  const recipeUpsert: IRecipeUpsert = {
    recipeId: recipeId,
    name: name,
    quantity: quantity,
    type: type,
    steps: steps,
    ingredientsInfo: ingredientsUpsert,
    imageUrls: imagesUpsert,
    tags: tagsUpsert,
  };

  return recipeUpsert;
};
