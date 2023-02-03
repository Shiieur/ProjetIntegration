import { HttpClient, getToast } from '../../../utils/api';
import { array, number, object, string } from 'yup';
import { EntityType, IRecipe, RecipeType } from '../../../utils/interfaces';

export interface IFormikConfiguration {
  recipe?: IRecipe;
  setPageState: React.Dispatch<React.SetStateAction<'list' | 'form'>>;
  setSelectedRecipe: React.Dispatch<React.SetStateAction<IRecipe>>;
  resetIngredients: () => Promise<void>;
}

const FormikConfiguration = ({
  recipe,
  setPageState,
  setSelectedRecipe,
  resetIngredients,
}: IFormikConfiguration) => {
  const initialRecipe: IRecipe = {
    id: recipe?.id ?? -1,    
    name: recipe?.name ?? '',
    images: recipe?.images ?? [{entityId: -1, entityType: EntityType.RECIPE, url: ''}],
    bookmarked: recipe?.bookmarked ?? false,
    steps: recipe?.steps ?? '',
    quantity: recipe?.quantity ?? -1,
    type: recipe?.type ?? RecipeType.DRINK,
    author: recipe?.author ?? '',
    tags: recipe?.tags ?? [''],
    ingredients: recipe?.ingredients ?? [],    
  };
  
  const validationSchema = object({
    name: string()
      .max(50, 'Must be 50 characters or less')
      .required('Required'),
    image: string().required('Required'),
    ingredients: array().min(1).required('At least 1 ingredient required.'),
    quantity: number().moreThan(-1).required('Require a number.'),
    steps: string().required('Required'),
  });

  const postRecipe = ({
    name,
    images,
    bookmarked,    
    steps,
    quantity,
    type,
    author,
    tags,
    ingredients,
  }: IRecipe) => {
    HttpClient.post('/recipes', {      
      name: name,
      images: images,
      bookmarked: bookmarked,
      steps: steps,
      quantity: quantity,
      type: type,
      author: author,
      tags: tags,
      ingredients: ingredients,
    })
      .then((response) => {
        getToast(`The recipe ${name} has been succesfuly created.`);
        setPageState('list');
      })
      .catch((error) => {
        getToast(`Error while trying to create the recipe ${error}`, true);
      });
  };

  const putRecipe = ({
    id,
    name,
    images,
    bookmarked,    
    steps,
    quantity,
    type,
    author,
    tags,
    ingredients,
  }: IRecipe) => {
    HttpClient.put(`/recipes/${id}`, {
      name: name,
      images: images,
      bookmarked: bookmarked,
      steps: steps,
      quantity: quantity,
      type: type,
      author: author,
      tags: tags,
      ingredients: ingredients,
    })
      .then(async (response) => {
        getToast(`The recipe ${name} has been succesfuly modified.`);
        setPageState('list');
        setSelectedRecipe({ 
          id: -1,
          name: '',
          images: [{entityId: -1, entityType: EntityType.RECIPE, url: ''}],
          bookmarked: false,
          steps: '',
          quantity: 0,
          type: recipe?.type ?? RecipeType.DRINK,
          author: '',
          tags: [''],          
          ingredients: [],
        });
        resetIngredients();
      })
      .catch((error) => {
        getToast(`Error while trying to edit the recipe ${error}`, true);
      });
  };

  const onSubmit = async (recipe: IRecipe) => {
    recipe.id > 0
      ? await putRecipe(recipe)
      : await postRecipe(recipe);
  };

  return { initialValues: initialRecipe, validationSchema, onSubmit };
};

export default FormikConfiguration;
