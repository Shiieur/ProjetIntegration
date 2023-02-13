import React from 'react';
import { useState, useEffect } from 'react';
import RecipeForm from './RecipeForm';
import { EntityType, IIngredient, IGetRecipe, IGetIngredient, IRecipe, RecipeType } from '../../utils/interfaces';
import RecipeCard from './RecipeCard';
import { deleteRecipeRequest, getRecipesRequest, getIngredientsRequest } from '../../utils/api';
import { CardBody } from './RecipeCard/Card';

interface IRecipesProps {
  setPageState: React.Dispatch<React.SetStateAction<'list' | 'form'>>;
  pageState: 'list' | 'form';
}

const Recipes = ({ pageState, setPageState }: IRecipesProps) => {
  const [recipes, setRecipes] = useState<IGetRecipe[]>([]);

  const [ingredients, setIngredients] = useState<IGetIngredient[]>([]);

  const [selectedRecipe, setSelectedRecipe] = React.useState<IGetRecipe>({
    recipeId: -1,
    name: '',
    images: [{ entityId: -1, entityType: EntityType.RECIPE, url: '' }],
    bookmarked: false,
    steps: '',
    quantity: 0,
    type: RecipeType.DRINK,
    author: '',
    tags: [''],
    ingredients: [],
  });

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
    <RecipeForm recipe={selectedRecipe} setPageState={setPageState} ingredientList={ingredients} setSelectedRecipe={setSelectedRecipe} resetIngredients={getIngredients} />
  ) : selectedRecipe.recipeId === -1 ? (
    <RecipeCard
      recipes={recipes}
      setPageState={setPageState}
      setSelectedRecipe={setSelectedRecipe}
      setIngredients={setIngredients}
      deleteRecipe={deleteRecipe}
      onRefresh={onRefresh}
    />
  ) : (
    <CardBody recipe={selectedRecipe} setPageState={setPageState} setSelectedRecipe={setSelectedRecipe} setIngredients={setIngredients} deleteRecipe={deleteRecipe} />
  );
};

export default Recipes;
