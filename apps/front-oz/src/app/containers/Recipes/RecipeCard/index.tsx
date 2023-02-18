import './styles.css';
import * as React from 'react';
import { IGetRecipe, IGetIngredient, RecipeType } from '../../../utils/interfaces';
import { useEffect, useState } from 'react';
import CardInfos from 'src/app/components/CardsGrid/CardInfos';
import { Container } from 'src/app/components/CardsGrid/style';

export interface IRecipeCard {
  recipes: IGetRecipe[];
  setPageState: React.Dispatch<React.SetStateAction<'form' | 'list'>>;
  setIngredients: React.Dispatch<React.SetStateAction<IGetIngredient[]>>;
  setSelectedRecipe: React.Dispatch<React.SetStateAction<IGetRecipe>>;
  deleteRecipe: (id: number, name?: string) => Promise<void>;
  user: string;
  filterUser: boolean;
  filterType: RecipeType;
  recipeFilterSearch: string;
  ingredientFilterSearch: string;
  onRefresh: () => void;
}

export const RecipeCard = ({
  recipes,
  setPageState,
  setSelectedRecipe,
  setIngredients,
  deleteRecipe,
  user,
  filterUser,
  filterType,
  recipeFilterSearch,
  ingredientFilterSearch,
  onRefresh,
}: IRecipeCard) => {
  //allows to swap side every 3 cards
  const isInverted = (index: number) => {
    const realIndex = index + 1;
    return realIndex === 1 || realIndex === 2 || realIndex === 3 || (realIndex - 1) % 6 === 0 || (realIndex - 2) % 6 === 0 || (realIndex - 3) % 6 === 0;
  };

  const filterRecipes = (recipesToBeFiltered: IGetRecipe[]) => {
    return recipesToBeFiltered
      .filter((recipe) => !filterUser || recipe.author === user)
      .filter((recipe) => recipe.type === filterType)
      .filter((recipe) => recipe.name.includes(recipeFilterSearch))
      .filter((recipe) => recipe.ingredients.find((ingredient) => ingredient.name.includes(ingredientFilterSearch)));
  };

  return (
    <Container>
      {filterRecipes(recipes).map((recipe, index) => (
        <CardInfos recipe={recipe} inverted={isInverted(index)} setSelectedRecipe={setSelectedRecipe} setPageState={setPageState} deleteRecipe={deleteRecipe} />
      ))}
    </Container>
  );
};
export default RecipeCard;
