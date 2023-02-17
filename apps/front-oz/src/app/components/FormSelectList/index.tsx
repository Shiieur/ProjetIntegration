import React, { useState } from 'react';
import FormSelect from '../FormSelect';
import { getIngredientsOptions, getUnitOptions, setSelectedValuesInFormik, units } from './helper';
import { IGetRecipe, IGetIngredient } from '../../utils/interfaces';
import { IngredientBox, IngredientList, Title } from './style';

export interface IOptions {
  value: number;
  label: string;
}

export interface IQuantities {
  ingredientId: number;
  quantity: number;
}

export interface IIngredientUnit {
  ingredientId: number;
  unitId: number;
  name: string;
}

export interface ISelectedIngredients {
  id: number;
  index: number;
}

interface IFormSelectListProps {
  ingredients: IGetIngredient[];
  recipe: IGetRecipe;
  setPageStage: React.Dispatch<React.SetStateAction<'list' | 'form'>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any;
}

const defaultOption: IOptions = { value: 0, label: 'Nothing' };
const FormSelectList = ({ ingredients, recipe, formik }: IFormSelectListProps) => {
  const [selectedIngredients, setSelectedIngredients] = useState<IOptions[]>([defaultOption]);
  const [selectedIngredientsQuantities, setSelectedIngredientsQuantities] = useState<IQuantities[]>([]);
  const [selectedIngredientsUnits, setSelectedIngredientsUnits] = useState<IIngredientUnit[]>([]);

  //checks if the ingredient linked to the quantity exists in the array, if yes and the quantity set to it isn't the same then it replaces the quantity
  //if it's the same, it does nothing and if it doesn't exist in the array, it adds it to it.
  const onQuantityChange = (ingredientId: number, quantity: number) => {
    editSelectedIngredientQuantity(ingredientId, quantity);
    const finalSelectedIngredients = selectedIngredients;

    finalSelectedIngredients.map((ingredient) => ingredient.value > 0);

    setSelectedValuesInFormik({
      ingredientOptionList: finalSelectedIngredients,
      ingredients,
      formik,
      ingredientsQuantities: selectedIngredientsQuantities,
    });
  };

  const editSelectedIngredientQuantity = (ingredientId: number, quantity: number) => {
    const newSelectIngredientsQuantity = selectedIngredientsQuantities;
    const idQuantities = newSelectIngredientsQuantity.map((ingredient) => ingredient.ingredientId);

    if (idQuantities.includes(ingredientId)) {
      newSelectIngredientsQuantity.forEach((ingredient) => {
        if (ingredient.ingredientId === ingredientId && ingredient.quantity !== quantity) {
          ingredient.quantity = quantity;
        }
      });
      setSelectedIngredientsQuantities(newSelectIngredientsQuantity);
    } else if (ingredientId > 0) {
      newSelectIngredientsQuantity.push({ ingredientId, quantity });
      setSelectedIngredientsQuantities(newSelectIngredientsQuantity);
    }
  };

  const onSelectChangeIngredients = (selectedIngredient: IOptions, previousSelectedIngredient?: IOptions) => {
    // Si yavais un element selectionné, remove it, sinon liste de base
    const newSelectedIngredients = previousSelectedIngredient ? removeIngredient(selectedIngredients, previousSelectedIngredient) : selectedIngredients;

    // Si un new ingredient a été selectionné, add
    if (selectedIngredient) {
      newSelectedIngredients.push(selectedIngredient);
    }

    // Always make sure we have one and only one default option field to be able to add dynamically
    const finalSelectedIngredients = removeIngredient(newSelectedIngredients, defaultOption);
    // Set formik values before re-adding the default one
    setSelectedValuesInFormik({
      ingredientOptionList: finalSelectedIngredients,
      ingredients,
      ingredientsQuantities: selectedIngredientsQuantities,
      ingredientsUnits: selectedIngredientsUnits,
      formik,
    });
    finalSelectedIngredients.push(defaultOption);

    // Refresh the page with the new selected values
    setSelectedIngredients(finalSelectedIngredients);
  };

  const onSelectChangeUnit = (ingredientId: number, selectedUnit?: IOptions) => {
    const finalSelectedIngredients = selectedIngredients;
    const selectedIngredientUnit: IIngredientUnit[] = [{ ingredientId: ingredientId, unitId: selectedUnit?.value ?? -1, name: selectedUnit?.label ?? '' }];
    // Set formik values before re-adding the default one
    setSelectedValuesInFormik({
      ingredientOptionList: finalSelectedIngredients,
      ingredients,
      // ingredientsUnits: selectedIngredientUnit,
      ingredientsUnits: selectedIngredientUnit,
      formik,
    });

    // Refresh the page with the new selected values
    setSelectedIngredients(finalSelectedIngredients);
  };

  const removeIngredient = (selectedIngredientsOptions: IOptions[], ingredientOptionToRemove: IOptions) => {
    //supprime un ingrédient option -> faire la même pour la quantité
    const newSelectIngredientsQuantity = selectedIngredientsQuantities;
    const newSelectIngredientsUnit = selectedIngredientsUnits;
    const newSelectedIngredients = [...selectedIngredientsOptions];
    const ingredientIndex = newSelectedIngredients.findIndex((ingredient) => ingredientOptionToRemove.value === ingredient.value);

    if (ingredientIndex >= 0) newSelectedIngredients.splice(ingredientIndex, 1);
    const ingredientQuantityIndex = newSelectIngredientsQuantity.findIndex((ingredient) => ingredientOptionToRemove.value === ingredient.ingredientId);
    const ingredientUnitIndex = newSelectIngredientsQuantity.findIndex((ingredient) => ingredientOptionToRemove.value === ingredient.ingredientId);

    if (ingredientQuantityIndex >= 0) {
      newSelectIngredientsQuantity.splice(ingredientQuantityIndex, 1);
      setSelectedIngredientsQuantities(newSelectIngredientsQuantity);
    }

    if (ingredientUnitIndex >= 0) {
      newSelectIngredientsUnit.splice(ingredientUnitIndex, 1);
      setSelectedIngredientsUnits(newSelectIngredientsUnit);
    }

    return newSelectedIngredients;
  };

  const getQuantity = (ingredientId: number) => {
    const quantity = selectedIngredientsQuantities.find((ingredient) => ingredient.ingredientId === ingredientId);
    if (quantity === undefined || quantity === null) {
      return 0;
    } else {
      return quantity?.quantity;
    }
  };

  const getUnit = (ingredientId: number) => {
    const selectedUnitForIngredient: IGetIngredient = formik.values.ingredients.filter((ingredient: IGetIngredient) => ingredient.ingredientId === ingredientId)[0];
    const { name, unitId } = units.filter((unit) => unit.unitId === selectedUnitForIngredient?.unit?.unitId)[0] ?? {};
    if (!unitId || !name) return undefined;
    return { label: name, value: unitId };
  };

  if (recipe.recipeId > 0 && selectedIngredients.length === 1) {
    recipe.ingredients.forEach((ingredient) => {
      const options: IOptions = {
        value: ingredient.ingredientId,
        label: ingredient.name,
      };
      onSelectChangeIngredients(options);
    });
    recipe.ingredients.forEach((ingredient) => {
      editSelectedIngredientQuantity(ingredient.ingredientId, ingredient.quantity ?? 0);
    });
  }

  return (
    <IngredientList>
      {selectedIngredients.map((ingredient, index) => (
        <IngredientBox>
          <Title>{index + 1 + 'e Ingrédient'}</Title>
          <FormSelect
            key={'ingredientOption_' + index}
            options={getIngredientsOptions(ingredients, selectedIngredients)}
            defaultValue={ingredient}
            onSelectChange={(values) => onSelectChangeIngredients(values, ingredient)}
            name="ingredients"
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
          <br />
          <FormSelect
            key={'unitOption_' + index}
            options={getUnitOptions()}
            defaultValue={getUnit(ingredient.value)}
            onSelectChange={(values) => onSelectChangeUnit(ingredient.value, values)}
            name="units"
          />
        </IngredientBox>
      ))}
    </IngredientList>
  );
};

export default FormSelectList;
