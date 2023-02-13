import React from 'react';
import { useState, useEffect } from 'react';
import IngredientForm from './IngredientForm';
import IngredientsList from './IngredientsList';
import { deleteIngredientRequest, getIngredientsRequest } from '../../utils/api';
import { EntityType, IGetIngredient, IIngredient } from '../../utils/interfaces';

interface IIngredientsProps {
  setPageState: React.Dispatch<React.SetStateAction<'list' | 'form'>>;
  pageState: 'list' | 'form';
}

const Ingredients = ({ pageState, setPageState }: IIngredientsProps) => {
  const [ingredients, setIngredients] = useState<IGetIngredient[]>([]);
  const [selectedIngredient, setSelectedIngredient] = React.useState<IGetIngredient>({
    ingredientId: -1,
    name: '',
    image: [{ entityId: -1, entityType: EntityType.INGREDIENT, url: '' }],
    alcoholic: false,
    unit: { unitId: -1, name: '' },
  });

  useEffect(() => {
    getIngredients();
  }, []);

  const onRefresh = () => {
    getIngredients();
  };

  const resetIngredient = () => {
    setSelectedIngredient({
      ingredientId: -1,
      name: '',
      image: [{ entityId: -1, entityType: EntityType.INGREDIENT, url: '' }],
      alcoholic: false,
      unit: { unitId: -1, name: '' },
    });
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
    <IngredientForm ingredient={selectedIngredient} setPageState={setPageState} />
  ) : (
    <IngredientsList
      ingredients={ingredients}
      setSelectedIngredient={setSelectedIngredient}
      deleteIngredient={deleteIngredient}
      setPageState={setPageState}
      resetIngredient={resetIngredient}
      onRefresh={onRefresh}
    />
  );
};

export default Ingredients;
