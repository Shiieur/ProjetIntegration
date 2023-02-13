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
  unitId: number;
  name: string;
  quantity?: number;
  alcoholic: boolean;
  image: IImage[];
}

export interface IFormikIngredient {
  ingredientId: number;
  name: string;
  alcoholic: boolean;
  imageUrl: string;
}

export interface IGetIngredient {
  ingredientId: number;  
  name: string;
  quantity?: number;
  alcoholic: boolean;
  unit?: IUnit;  
  image: IImage[];
}

export interface IGetRecipe {
  recipeId: number;
  name: string;
  images: IImage[];
  bookmarked: boolean;
  steps: string;
  quantity: number; //for the number of person
  type: RecipeType;
  author: string;
  tags: string[];
  ingredients: IGetIngredient[];  
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
  bookmarked: boolean;
  steps: string;
  quantity: number; //for the number of person
  type: RecipeType;
  author: string;
  tags: string[];
  ingredients: IIngredient[];  
}

export interface IRecipeUpsert {
  recipeId?: number;
  name: string;
  imageUrls: string[];
  steps: string;
  quantity: number; //for the number of person
  type: RecipeType;
  tags: string[];
  ingredientsInfo: IIngredient[];  
}

export interface IRecipeFormik {
  recipeId?: number;
  name: string;
  images: 
  {
    "label": string,
    "value": string,
  }[];
  steps: string;
  quantity: number; //for the number of person
  type: RecipeType;
  tags: {
    "label": string,
    "value": string,
  }[];
  ingredients: IGetIngredient[];  
}

export interface IUnit {
  unitId: number;
  name: string;
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
