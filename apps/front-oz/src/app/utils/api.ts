import axios, { AxiosResponse } from 'axios';
import * as rax from 'retry-axios';
import { IIngredient, IRecipe } from './interfaces';
import toast from 'react-hot-toast';

//récupère l'accesstoken dans le local storage et setup axios.

export const HttpClient = axios.create({
  baseURL: 'http://localhost:3333/api/',
  headers: {
    Authorization: `bearer ${localStorage.getItem('token')}`,
    'content-type': 'application/json',
  },
});

//on gère le contenu des toast
export const getToast = (message: string, error?: boolean) => {
  error === true
    ? toast.error(message, { duration: 3000, position: 'top-right' })
    : toast.success(message, { duration: 3000, position: 'top-right' });
};

//retry policies sur les get via retry-axios
HttpClient.defaults.raxConfig = {
  instance: HttpClient,
};

export const getIngredientsRequest = async (): Promise<
  AxiosResponse<IIngredient[], any>
> => {
  //rax.attach = retry policies -> by default 3s withtout config
  rax.attach(HttpClient);
  const response = await HttpClient.get<IIngredient[]>('/ingredients');
  return response;
};

export const getRecipesRequest = async (): Promise<
  AxiosResponse<IRecipe[], any>
> => {
  rax.attach(HttpClient);
  const response = await HttpClient.get<IRecipe[]>('/recipes');
  return response;
};

export const deleteRecipeRequest = async (
  id: number,
  name?: string
): Promise<void> => {
  await HttpClient.delete(`http://localhost:3333/api/recipes?ids=${id}`)
    .then(() => {
      getToast(`The recipe ${name} has been succesfuly deleted.`);
    })
    .catch((error) => {
      getToast(`Error while trying to delete the recipe ${error}`, true);
    });
};

export const deleteIngredientRequest = async (
  id: number,
  name?: string
): Promise<void> => {
  await HttpClient.delete(`http://localhost:3333/api/ingredients?ids=${id}`)
    .then(() => {
      getToast(`The ingredient ${name} has been succesfuly deleted.`);
    })
    .catch((error) => {
      getToast(`Error while trying to delete the ingredient ${error}`, true);
    });
};
