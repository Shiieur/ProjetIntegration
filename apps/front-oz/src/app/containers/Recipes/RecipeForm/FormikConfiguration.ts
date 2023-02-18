import { HttpClient, getToast } from '../../../utils/api';
import { array, number, object, string } from 'yup';
import { IRecipe, IRecipeFormik, IRecipeUpsert, IGetRecipe,RecipeType, IIngredient, IGetIngredient } from '../../../utils/interfaces';
import { buildRecipeFormik, buildRecipeUpsert } from './helper';

export interface IFormikConfiguration {
  recipe: IGetRecipe;
  setPageState: React.Dispatch<React.SetStateAction<'list' | 'form'>>;
  setSelectedRecipe: React.Dispatch<React.SetStateAction<IGetRecipe>>;
  resetIngredients: () => Promise<void>;
  
  onRefresh: () => void;
}

const FormikConfiguration = ({
  recipe,
  setPageState,
  setSelectedRecipe,
  resetIngredients,
  onRefresh
}: IFormikConfiguration) => {
  const initialRecipe: IRecipeFormik = buildRecipeFormik(recipe ?? {});

  const validationSchema = object({
    name: string()
      .max(50, 'Must be 50 characters or less')
      .required('Required'),
    images: array()
    .of(
      object().shape({
        label: string(),
        value: string(),
      })
    )
    .required('Required'),
    ingredients: array().min(1).required('At least 1 ingredient required.'),
    quantity: number().moreThan(0).required('Require a number.'),
    steps: string().required('Steps Required'),
    tags: array()
    .of(
      object().shape({
        label: string(),
        value: string(),
      })
    ).max(3, 'A maximum of 3 tags are authorized.').required('Tags are required.')
  });

  const postRecipe = (recipeRequest: IRecipeUpsert) => {
    HttpClient.post('/recipes', recipeRequest)
      .then((response) => {
        getToast(`The recipe ${recipeRequest.name} has been succesfuly created.`);
        onRefresh();
      })
      .catch((error) => {
        getToast(`Error while trying to create the recipe ${error}`, true);
      });
  };

  const putRecipe = (recipeRequest: IRecipeUpsert) => {
    HttpClient.put(`/recipes`, recipeRequest)
      .then(async (response) => {
        getToast(`The recipe ${recipeRequest.name} has been succesfuly modified.`);
        onRefresh();
        resetIngredients();
      })
       .catch((error) => {
        getToast(`Error while trying to edit the recipe ${error}`, true);
      });
  };

  const onSubmit = async (recipeFormik : IRecipeFormik) => {
    const recipeUpsert = buildRecipeUpsert(recipeFormik);
    recipeUpsert.recipeId && recipeUpsert.recipeId > 0
      ? await putRecipe(recipeUpsert)
      : await postRecipe(recipeUpsert);
  };

  return { initialValues: initialRecipe, validationSchema, onSubmit };
};


export default FormikConfiguration;
