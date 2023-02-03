import './styles.css';
import React, { useState } from 'react';
import FormSelect from '../FormSelect';
import { getOptions, setSelectedValuesInFormik } from './helper';
import { IIngredient, IRecipe } from '../../utils/interfaces';

export interface IOptions {
  value: number;
  label: string;
}

export interface IQuantities {
  ingredientId: number;
  quantity: number;
}

export interface ISelectedIngredients {
  id: number;
  index: number;
}

interface IProps {
  ingredients: IIngredient[];
  recipe: IRecipe;
  setPageStage: React.Dispatch<React.SetStateAction<'list' | 'form'>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any;
}

const defaultOption: IOptions = { value: 0, label: 'Nothing' };
const FormSelectList = ({ ingredients, recipe, formik }: IProps) => {
  const [selectedIngredients, setSelectedIngredients] = useState<IOptions[]>([
    defaultOption,
  ]);
  const [selectedIngredientsQuantities, setSelectedIngredientsQuantities] =
    useState<IQuantities[]>([]);

  //checks if the ingredient linked to the quantity exists in the array, if yes and the quantity set to it isn't the same then it replaces the quantity
  //if it's the same, it does nothing and if it doesn't exist in the array, it adds it to it.
  const onQuantityChange = (ingredientId: number, quantity: number) => {
    editSelectedIngredientQuantity(ingredientId, quantity);
    const finalSelectedIngredients = selectedIngredients;

    finalSelectedIngredients.map((ingredient) => ingredient.value > 0);

    setSelectedValuesInFormik(
      finalSelectedIngredients,
      ingredients,
      selectedIngredientsQuantities,
      formik
    );
  };

  const editSelectedIngredientQuantity = (
    ingredientId: number,
    quantity: number
  ) => {
    const newSelectIngredientsQuantity = selectedIngredientsQuantities;
    const idQuantities = newSelectIngredientsQuantity.map(
      (ingredient) => ingredient.ingredientId
    );

    if (idQuantities.includes(ingredientId)) {
      newSelectIngredientsQuantity.forEach((ingredient) => {
        if (
          ingredient.ingredientId === ingredientId &&
          ingredient.quantity !== quantity
        ) {
          ingredient.quantity = quantity;
        }
      });
      setSelectedIngredientsQuantities(newSelectIngredientsQuantity);
    } else if (ingredientId > 0) {
      newSelectIngredientsQuantity.push({ ingredientId, quantity });
      setSelectedIngredientsQuantities(newSelectIngredientsQuantity);
    }
  };

  const onSelectChange = (
    selectedIngredient: IOptions,
    previousSelectedIngredient?: IOptions
  ) => {
    // Si yavais un element selectionné, remove it, sinon liste de base
    const newSelectedIngredients = previousSelectedIngredient
      ? removeIngredient(selectedIngredients, previousSelectedIngredient)
      : selectedIngredients;

    // Si un new ingredient a été selectionné, add
    if (selectedIngredient) {
      newSelectedIngredients.push(selectedIngredient);
    }

    // Always make sure we have one and only one default option field to be able to add dynamically
    const finalSelectedIngredients = removeIngredient(
      newSelectedIngredients,
      defaultOption
    );
    // Set formik values before re-adding the default one
    setSelectedValuesInFormik(
      finalSelectedIngredients,
      ingredients,
      selectedIngredientsQuantities,
      formik
    );
    finalSelectedIngredients.push(defaultOption);

    // Refresh the page with the new selected values
    setSelectedIngredients(finalSelectedIngredients);
  };

  const removeIngredient = (
    selectedIngredientsOptions: IOptions[],
    ingredientOptionToRemove: IOptions
  ) => {
    //supprime un ingrédient option -> faire la même pour la quantité
    const newSelectIngredientsQuantity = selectedIngredientsQuantities;
    const newSelectedIngredients = [...selectedIngredientsOptions];
    const ingredientIndex = newSelectedIngredients.findIndex(
      (ingredient) => ingredientOptionToRemove.value === ingredient.value
    );
    if (ingredientIndex >= 0) newSelectedIngredients.splice(ingredientIndex, 1);
    const ingredientQuantityIndex = newSelectIngredientsQuantity.findIndex(
      (ingredient) => ingredientOptionToRemove.value === ingredient.ingredientId
    );
    if (ingredientQuantityIndex >= 0) {
      newSelectIngredientsQuantity.splice(ingredientQuantityIndex, 1);
      setSelectedIngredientsQuantities(newSelectIngredientsQuantity);
    }
    return newSelectedIngredients;
  };

  const getQuantity = (id: number) => {
    const quantity = selectedIngredientsQuantities.find(
      (ingredient) => ingredient.ingredientId === id
    );
    if (quantity === undefined || quantity === null) {
      return 0;
    } else {
      return quantity?.quantity;
    }
  };

  if (recipe.id > 0 && selectedIngredients.length === 1) {
    recipe.ingredients.forEach((ingredient) => {
      const options: IOptions = {
        value: ingredient.ingredientId,
        label: ingredient.name,
      };
      onSelectChange(options);
    });
    recipe.ingredients.forEach((ingredient) => {
      editSelectedIngredientQuantity(ingredient.ingredientId, 1);
      // 1 has to become ingredient.quantity
    });
  }

  return (
    <>
      {selectedIngredients.map((ingredient, index) => (
        <>
          <FormSelect
            key={index}
            ingredientsOptions={getOptions(ingredients, selectedIngredients)}
            defaultValue={ingredient}
            onSelectChange={(values) => onSelectChange(values, ingredient)}
          />
          <input
            name="quantity"
            defaultValue={getQuantity(ingredient.value)}
            type="number"
            onChange={(event) => {
              const stringValue = event?.target.value;
              const value = parseInt(stringValue, 10);
              if (!isNaN(value)) onQuantityChange(ingredient.value, value);
            }}
          ></input>
          {ingredients.find((ing) => ing.ingredientId === ingredient.value)?.name}
          {/* .name has to become .unit */}
          <br />
        </>
      ))}
    </>
  );
};
export default FormSelectList;
