import React from 'react';
import { useState, useEffect } from 'react';
import RecipeForm from './RecipeForm';
import { IGetRecipe, IGetIngredient, RecipeType } from '../../utils/interfaces';
import RecipeCard from './RecipeCard';
import { deleteRecipeRequest, getRecipesRequest, getIngredientsRequest } from '../../utils/api';
import { CardBody } from './RecipeCard/Card';
import { buildRecipeFormik } from './RecipeForm/helper';

interface IRecipesProps {
  setPageState: React.Dispatch<React.SetStateAction<'list' | 'form'>>;
  pageState: 'list' | 'form';
  selectedRecipe: IGetRecipe;
  setSelectedRecipe: React.Dispatch<React.SetStateAction<IGetRecipe>>;
  filterUser: boolean;
  filterType: RecipeType;
  recipeFilterSearch: string;
  ingredientFilterSearch: string;
}

const Recipes = ({ pageState, setPageState, selectedRecipe, setSelectedRecipe, filterUser, filterType, recipeFilterSearch, ingredientFilterSearch }: IRecipesProps) => {
  const [recipes, setRecipes] = useState<IGetRecipe[]>([]);
  const user = 'Calvin'; //to be changed with getUser when the User WS is up for the profile management
  const [ingredients, setIngredients] = useState<IGetIngredient[]>([]);

  useEffect(() => {
    getRecipes();
    getIngredients();
  }, []);

  const onRefresh = () => {
    getRecipes();
    setPageState('list');
  };

  const getIngredients = async () => {
    const response = await getIngredientsRequest();
    const ingredients = response.data;
    setIngredients(ingredients);
  };

  const getRecipes = async () => {
    const response = await getRecipesRequest();
    setRecipes(response.data);
  };

  const deleteRecipe = async (id: number, name?: string) => {
    await deleteRecipeRequest(id, name);
    onRefresh();
  };

  return pageState === 'form' ? (
    <RecipeForm
      recipe={selectedRecipe}
      setPageState={setPageState}
      ingredientList={ingredients}
      setSelectedRecipe={setSelectedRecipe}
      resetIngredients={getIngredients}
      onRefresh={onRefresh}
    />
  ) : selectedRecipe.recipeId === -1 ? (
    <RecipeCard
      recipes={recipes}
      setPageState={setPageState}
      setSelectedRecipe={setSelectedRecipe}
      setIngredients={setIngredients}
      deleteRecipe={deleteRecipe}
      user={user}
      filterUser={filterUser}
      filterType={filterType}
      recipeFilterSearch={recipeFilterSearch}
      ingredientFilterSearch={ingredientFilterSearch}
      onRefresh={onRefresh}
    />
  ) : (
    <CardBody recipe={selectedRecipe} setPageState={setPageState} setSelectedRecipe={setSelectedRecipe} setIngredients={setIngredients} deleteRecipe={deleteRecipe} />
  );
};

export default Recipes;
