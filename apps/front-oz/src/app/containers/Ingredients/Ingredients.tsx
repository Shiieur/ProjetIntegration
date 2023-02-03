import React from 'react';
import { useState, useEffect } from 'react';
import IngredientForm from './IngredientForm';
import IngredientsList from './IngredientsList';
import {
  deleteIngredientRequest,
  getIngredientsRequest,
} from '../../utils/api';
import { EntityType, IIngredient } from '../../utils/interfaces';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState<IIngredient[]>([]);
  const [selectedIngredient, setSelectedIngredient] =
    React.useState<IIngredient>({    
      ingredientId: -1,
      name: '',
      image : [{entityId: -1, entityType: EntityType.INGREDIENT, url: ''}],
      alcoholic: false,
    });

  const [pageState, setPageState] = useState<'list' | 'form'>('list');

  useEffect(() => {
    getIngredients();
  }, []);

  const onRefresh = () => {
    getIngredients();
  };

  const getIngredients = async () => {
    const response = await getIngredientsRequest();
    setIngredients(response.data);
  };

  const deleteIngredient = async (id: number, name?: string) => {
    await deleteIngredientRequest(id, name);
    onRefresh();
  };
  return pageState === 'form' ? (
    <IngredientForm
      ingredient={selectedIngredient}
      setPageState={setPageState}
    />
  ) : (
    <IngredientsList
      ingredients={ingredients}
      setSelectedIngredient={setSelectedIngredient}
      deleteIngredient={deleteIngredient}
      setPageState={setPageState}
      onRefresh={onRefresh}
    />
  );
};

export default Ingredients;
