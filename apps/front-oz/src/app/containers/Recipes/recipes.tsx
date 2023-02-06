import React from 'react';
import { useState, useEffect } from 'react';
import RecipeForm from './RecipeForm';
import axios from 'axios';
import { EntityType, IIngredient, IRecipe, RecipeType } from '../../utils/interfaces';
import RecipeCard from './RecipeCard';
import {
  deleteRecipeRequest,
  getRecipesRequest,
  getIngredientsRequest,
} from '../../utils/api';

const Recipes = () => { 
  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  const [ingredients, setIngredients] = useState<IIngredient[]>([]);
  
  const [selectedRecipe, setSelectedRecipe] = React.useState<IRecipe>({
    id: -1,
    name: '',
    images: [{entityId: -1, entityType: EntityType.RECIPE, url: ''}],
    bookmarked: false,  
    steps: '',  
    quantity: 0,
    type: RecipeType.DRINK,
    author: '',
    tags: [''],
    ingredients: [],
  });

  const [pageState, setPageState] = useState<'list' | 'form'>('list');
  
  useEffect(() => {
    getRecipes();
    getIngredients();
  }, []);
  
  const onRefresh = () => {
    getRecipes();
  };

  const getIngredients = async () => {
    const response = await getIngredientsRequest();
    setIngredients(response.data);
  };

  const getRecipes = async () => {
    const response = await getRecipesRequest();
    console.log(response.data)
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
    />
  ) : (
    <RecipeCard
      recipes={recipes}
      setPageState={setPageState}
      setSelectedRecipe={setSelectedRecipe}
      setIngredients={setIngredients}
      deleteRecipe={deleteRecipe}
      onRefresh={onRefresh}
    />
  );
};

export default Recipes;
