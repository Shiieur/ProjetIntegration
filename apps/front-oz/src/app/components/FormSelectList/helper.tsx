import { IIngredient } from '../../utils/interfaces';
import './styles.css';
import { IOptions, IQuantities } from '.';

export const setSelectedValuesInFormik = (
  ingredientOptionList: IOptions[],
  ingredients: IIngredient[],
  ingredientsQuantities: IQuantities[],
  formik: any
) => {
  const newIngredients = buildIngredientList(
    ingredients,
    ingredientsQuantities,
    ingredientOptionList
  );
  formik.setFieldValue('ingredients', newIngredients);
};

export const buildIngredientList = (
  ingredients: IIngredient[],
  ingredientsQuantities: IQuantities[],
  selectedIngredients: IOptions[]
) => {
  const finalIngredients = [...ingredients];
  if (ingredientsQuantities.length >= 1) {
    finalIngredients.forEach((ing) =>
      ingredientsQuantities.forEach((qty) =>
        ing.ingredientId === qty.ingredientId
          ? (ing.quantity = qty.quantity)
          : ing.quantity
      )
    );
  }
  const selectedIds = selectedIngredients.map((ing) => ing.value);
  return finalIngredients.filter((ingredient) =>
    selectedIds.includes(ingredient.ingredientId)
  );
};

export const getOptions = (
  ingredients: IIngredient[],
  selectedIngredients: IOptions[]
) => {
  return ingredients
    .filter(
      (ingredient) =>
        !selectedIngredients
          .map((selectedIngredient) => selectedIngredient.value)
          .includes(ingredient.ingredientId)
    )
    .map((ingredient) => ({
      value: ingredient.ingredientId,
      label: ingredient.name,
    }));
};
