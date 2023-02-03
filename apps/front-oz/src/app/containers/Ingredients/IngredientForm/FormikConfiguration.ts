import { Length } from 'class-validator';
import { bool, object, string } from 'yup';
import { EntityType, IIngredient } from '../../../utils/interfaces';
import { getToast, HttpClient } from '../../../utils/api';

export interface IFormikConfiguration {
  ingredient?: IIngredient;
  setPageState: React.Dispatch<React.SetStateAction<'list' | 'form'>>;
}

const FormikConfiguration = ({
  ingredient,
  setPageState,
}: IFormikConfiguration) => { 
  const initialIngredient: IIngredient = {
    ingredientId: ingredient?.ingredientId ?? -1,
    name: ingredient?.name ?? '',
    image: ingredient?.image ?? [{entityId: -1, entityType: EntityType.RECIPE, url: ''}],
    alcoholic: false,      
  };
 
  const validationSchema = object({
    name: string()
      .max(50, 'Must be 50 characters or less')
      .required('Required'),
    image: string().required('Required'),
    alcoholic: bool().required(),
  });

  const postIngredient = ({ name, alcoholic, image }: IIngredient) => {
    console.log({name, alcoholic, image});
    HttpClient.post('/ingredients', {
      name: name,
      alcoholic: alcoholic,
      imageUrl: image[0].url,
    })
      .then((response) => {
        getToast(`The ingredient ${name} has been succesfuly created.`);
      })
      .catch((error) => {
        getToast(`Error while trying to create the ingredient ${error}`, true);
      });
  };

  const putIngredient = ({ name, alcoholic, image, ingredientId }: IIngredient) => {
    console.log({ingredientId, name, alcoholic, image});
    HttpClient.put(`/ingredients`, {
      ingredientId: ingredientId,
      name: name,
      alcoholic: alcoholic,
      imageUrl: image[0].url,
    })
      .then((response) => {
        getToast(`The ingredient ${name} has been succesfuly modified.`);
      })
      .catch((error) => {
        getToast(`Error while trying to edit the ingredient ${error}`, true);
      });
  };

  const onSubmit = async (ingredient: IIngredient) => {
    ingredient.ingredientId > 0
      ? await putIngredient(ingredient)
      : await postIngredient(ingredient);

    setPageState('list');
  };

  return { initialValues: initialIngredient, onSubmit }; 
  // validationSchema need to be added in the return
};

export default FormikConfiguration;
