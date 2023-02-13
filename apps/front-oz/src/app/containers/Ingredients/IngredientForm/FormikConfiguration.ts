import { bool, object, string, array, number, mixed } from 'yup';
import { EntityType, IIngredient, IFormikIngredient, IGetIngredient } from '../../../utils/interfaces';
import { getToast, HttpClient } from '../../../utils/api';

export interface IFormikConfiguration {
  ingredient?: IGetIngredient;
  setPageState: React.Dispatch<React.SetStateAction<'list' | 'form'>>;
}

const FormikConfiguration = ({
  ingredient,
  setPageState,
}: IFormikConfiguration) => { 
  const {ingredientId, name, image = [], alcoholic = false} = ingredient ?? {};
  const initialIngredient: IFormikIngredient = {
    ingredientId: ingredientId ?? -1,
    name: name ?? '',
    imageUrl: image[0].url ?? '',
    alcoholic:alcoholic      
  };

  const validationSchema = object({
    name: string()
      .max(50, 'Must be 50 characters or less')
      .required('The ingredient needs a name.'),
    imageUrl: string().url().required('URL Required'), 
    alcoholic: bool().required('Is it alcoholic or not ?'),
  });

  const postIngredient = (ingredient: IFormikIngredient) => {
    HttpClient.post('/ingredients', ingredient)
      .then((response) => {
        getToast(`The ingredient ${ingredient.name} has been succesfuly created.`);
      })
      .catch((error) => {
        getToast(`Error while trying to create the ingredient ${error}`, true);
      });
  };

  const putIngredient = (ingredient: IFormikIngredient) => {
    HttpClient.put(`/ingredients`, ingredient)
      .then((response) => {
        getToast(`The ingredient ${ingredient.name} has been succesfuly modified.`);
      })
      .catch((error) => {
        getToast(`Error while trying to edit the ingredient ${error}`, true);
      });
  };

  const onSubmit = async (ingredient: IFormikIngredient) => { 
    ingredient.ingredientId > 0
      ? await putIngredient(ingredient)
      : await postIngredient(ingredient);

    setPageState('list');
  };

  return { initialValues: initialIngredient, validationSchema, onSubmit };
};

export default FormikConfiguration;
