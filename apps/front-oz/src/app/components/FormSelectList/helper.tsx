import { IIngredient, IUnit, IGetIngredient } from '../../utils/interfaces';
import { IIngredientUnit, IOptions, IQuantities } from '.';

interface ISetSelectedValuesInFormikProps {
  ingredientOptionList: IOptions[];
  ingredients: IGetIngredient[];
  formik: any;
  ingredientsQuantities?: IQuantities[];
  ingredientsUnits?: IIngredientUnit[];
}
export const setSelectedValuesInFormik = ({ ingredientOptionList, ingredients, ingredientsQuantities, ingredientsUnits, formik }: ISetSelectedValuesInFormikProps) => {
  const newIngredients = buildIngredientList(ingredients, ingredientsQuantities ?? [], ingredientsUnits ?? [], ingredientOptionList);
  formik.setFieldValue('ingredients', newIngredients);
};

export const buildIngredientList = (ingredients: IGetIngredient[], ingredientsQuantities: IQuantities[], ingredientsUnits: IIngredientUnit[], selectedIngredients: IOptions[]) => {
  const finalIngredients = [...ingredients];
  finalIngredients.forEach((ingredient) => {
    if (ingredientsQuantities.length > 0) ingredient.quantity = ingredientsQuantities.filter((quantity) => quantity.ingredientId === ingredient.ingredientId)[0]?.quantity;

    if (ingredientsUnits.length > 0) {
      const newUnit = ingredientsUnits.filter((unit) => unit.ingredientId === ingredient.ingredientId)[0];
      if (newUnit) ingredient.unit = { unitId: newUnit.unitId, name: newUnit.name };
    }
  });

  const selectedIds = selectedIngredients.map((ing) => ing.value);
  return finalIngredients.filter((ingredient) => selectedIds.includes(ingredient.ingredientId));
};

export const getIngredientsOptions = (ingredients: IGetIngredient[], selectedIngredients: IOptions[]) => {
  return ingredients
    .filter((ingredient) => !selectedIngredients.map((selectedIngredient) => selectedIngredient.value).includes(ingredient.ingredientId))
    .map((ingredient) => ({
      value: ingredient.ingredientId,
      label: ingredient.name,
    }));
};

export const getUnits = () => {
  return units;
};

export const units: IUnit[] = [
  { unitId: 1, name: '' },
  { unitId: 2, name: 'ml' },
  { unitId: 3, name: 'g' },
  { unitId: 4, name: 'leaf' },
  { unitId: 5, name: 'wedge' },
  { unitId: 6, name: 'slice' },
  { unitId: 7, name: 'ounce' },
  { unitId: 8, name: 'tablespoon' },
  { unitId: 9, name: 'teaspoon' },
  { unitId: 10, name: 'cup' },
  { unitId: 11, name: 'fillet' },
];

export const getUnitOptions = () => {
  return units.map((unit) => ({
    value: unit.unitId,
    label: unit.name,
  }));
};
