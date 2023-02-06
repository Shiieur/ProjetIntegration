
import { getToast, HttpClient } from 'src/app/utils/api';
import { array, number, object, string } from 'yup';
import { EntityType, IImage, IRecipe, IRecipeFormik, IRecipeRequest, RecipeType } from 'src/app/utils/interfaces';

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

  const imagesFormik = recipe?.images.map(image => {
    return {
      value : image.url,
      label : image.url 
    }
  }) ?? [];

  const initialRecipe: IRecipeFormik = {
    id: recipe?.id ?? -1,    
    name: recipe?.name ?? '',
    images : imagesFormik,
    steps: recipe?.steps ?? '',
    quantity: recipe?.quantity ?? -1,
    type: recipe?.type ?? RecipeType.DRINK,
    tags: recipe?.tags ?? [''],
    ingredients: recipe?.ingredients ?? [],    
  };
  
  // const validationSchema = object({
  //   name: string()
  //     .max(50, 'Must be 50 characters or less')
  //     .required('Required'),
  //   images: string().required('Required'),
  //   ingredients: array().min(1).required('At least 1 ingredient required.'),
  //   quantity: number().moreThan(-1).required('Require a number.'),
  //   steps: string().required('Required'),
  // });

  const postRecipe = ({
    name,
    imageUrls,  
    steps,
    quantity,
    type,
    tags,
    ingredientsInfo,
  }: IRecipeRequest) => {
    const recipe = {
      name: name,
      imageUrls: imageUrls,
      steps: steps,
      quantity: quantity,
      type: type,
      tags: tags,
      ingredientsInfo: ingredientsInfo,
    }
    console.log(recipe)
    HttpClient.post('/recipes', recipe)
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
    imageUrls,
    steps,
    quantity,
    type,
    tags,
    ingredientsInfo,
  }: IRecipeRequest) => {
    HttpClient.put(`/recipes/${id}`, {
      name: name,
      imageUrls: imageUrls,
      steps: steps,
      quantity: quantity,
      type: type,
      tags: tags,
      ingredientsInfo: ingredientsInfo,
    })
      .then(async (response) => {
        getToast(`The recipe ${name} has been succesfuly modified.`);
        setPageState('list');
        resetIngredients();
      })
      .catch((error) => {
        getToast(`Error while trying to edit the recipe ${error}`, true);
      });
  };

  const onSubmit = async (recipeFormik : IRecipeFormik) => {
    const images : string[] = recipeFormik.images.map(image => {
      return image.value;
    })

    const recipe : IRecipeRequest = {
      ...recipeFormik,     
      ingredientsInfo : recipeFormik.ingredients,       
      imageUrls: images
    }

    recipe.id && recipe.id > 0
      ? await putRecipe(recipe)
      : await postRecipe(recipe);
  };

  return { initialValues: initialRecipe, onSubmit };
  // validationSchema
};

export default FormikConfiguration;
