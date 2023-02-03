export enum EntityType {
  INGREDIENT = 'Ingredient',
  RECIPE = 'Recipe',
}

export enum RecipeType {
  DRINK = 'Drink',
  MEAL = 'Meal'
}
export interface IIngredient {
  ingredientId: number;
  name: string;
  quantity?: number;
  alcoholic: boolean;
  image: IImage[];
}

export interface IImage {
  entityId: number;
  entityType: EntityType;
  url: string;
}

export interface IRecipe {
  id: number;
  name: string;
  images: IImage[];
  bookmarked: boolean;
  steps: string;
  quantity: number; //for the number of person
  type: RecipeType;
  author: string;
  tags: string[];
  ingredients: IIngredient[];  
}

export enum IngredientTypeProp {
  List = '/ingredients/list',
  Form = '/ingredients/form',
}

export interface IIngredientTypePath {
  type: IngredientTypeProp;
}

export interface IEditArguments {
  id?: number;
}
