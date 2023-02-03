import { IImagesEntity } from './database/images/images.entity';

export enum EntityType {
  INGREDIENT = 'Ingredient',
  RECIPE = 'Recipe',
}

export enum RecipeType {
  MEAL = 'Meal',
  DRINK = 'Drink',
}

export interface IIngredient {
  ingredientId: number;
  image?: IImagesEntity[];
  name: string;
  alcoholic: boolean;
}

export interface IUser {
  userId: number;
  email: string;
  username: string;
  profilePricture: string;
}

export interface IUnit {
  unitId: number;
  name: string;
}

export interface IImage {
  entityId: number;
  entityType: EntityType;
  url: string;
}

export interface IRecipe {
  recipeId: number;
  name: string;
  images: IImage[];
  bookmarked: boolean; //true if recipeId is in bookmarks
  steps: string;
  quantity: number; //for how many service or glass
  type: RecipeType; //meal or drink
  author: string;
  tags: string;
  ingredients: IIngredient[];
}

export interface IRecipeIngredients {
  recipeId: number;
  ingredientId: number;
  ingredientQuantity: number;
  ingredientUnitId: number; //in order to know what unit to use with each ingredient.
}

export interface IRecipeIngredientsDto {
  ingredientId: number;
  quantity: number;
  unitId: number;
}

export interface IRecipeIngredientsInnerIngredients {
  recipeId: number;
  ingredientId: number;
  recipeIngredientQuantity: number;
  recipeIngredientUnitId: number;
  id: number;
  name: string;
  alcoholic: boolean;
  isDeleted: number;
  unitId: number;
  unitName: string;
}

export interface IRecipeInnerImages {
  recipeId: number;
  recipeName: string;
  recipeSteps: string;
  recipeQuantity: number;
  recipeType: RecipeType;
  recipeAuthorId: number;
  recipeTags: string;
  imageEntityId: number;
  imageEntityType: EntityType;
  imageUrl: string;
}

export interface IIngredientInnerImage {
  recipeId: number;
  recipeName: string;
  recipeSteps: string;
  recipeQuantity: number;
  recipeType: RecipeType;
  recipeAuthorId: number;
  recipeTags: string;
  imageEntityId: number;
  imageEntityType: EntityType;
  imageUrl: string;
}
