import { IngredientsCreateRequestDto } from '../../../endpoints/ingredients/dto/requests/ingredientsCreateRequest.dto';
// This is a representation of a database ingredients table element
export interface IIngredientEntity {
  ingredientId?: number;
  name: string;
  alcoholic: number;
  isDeleted?: number;
}

export const buildIngredientEntity = (dto: IngredientsCreateRequestDto): IIngredientEntity => {
  const recipeEntity: IIngredientEntity = {
    name: dto.name,
    alcoholic: dto.alcoholic ? 1 : 0,
    isDeleted: 0,
  };
  return recipeEntity;
};
