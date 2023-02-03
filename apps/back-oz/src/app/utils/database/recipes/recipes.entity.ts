import { RecipesCreateRequestDto } from '../../../endpoints/recipes/dto/requests/recipesCreateRequest.dto';

// This is a representation of a database recipe table element
export interface IRecipeEntity {
  recipeId?: number;
  name: string;
  steps: string;
  quantity: number;
  type: string;
  authorId: number;
  tags: string;
}
export interface IFullRecipeEntity {
  recipe_recipeId: number;
  recipe_name: string;
  recipe_steps: string;
  recipe_quantity: number;
  recipe_type: string;
  recipe_tags: string;
  ingredient_id?: number;
  ingredient_quantity?: number;
  ingredient_unitId?: number;
  ingredient_unitName?: string;
  ingredient_name?: string;
  ingredient_isAlcoholic?: number;
  author_email: string;
  author_username: string;
  author_profilePicture?: string;
  author_userId: number;
}

export const buildRecipeEntity = (dto: RecipesCreateRequestDto, authorId: number): IRecipeEntity => {
  const recipeEntity: IRecipeEntity = {
    name: dto.name,
    steps: dto.steps,
    quantity: dto.quantity,
    type: dto.type,
    authorId: authorId,
    tags: JSON.stringify(dto.tags),
  };

  return recipeEntity;
};
