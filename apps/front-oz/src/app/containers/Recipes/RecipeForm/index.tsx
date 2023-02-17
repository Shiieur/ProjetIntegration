import { useFormik } from 'formik';
import FormikConfiguration from './FormikConfiguration';
import FormInput from '../../../components/FormInput';
import SubmitButton from '../../../components/SubmitButton';
import { IIngredient, IGetIngredient, IRecipe, IGetRecipe } from '../../../utils/interfaces';
import FormSelectList from '../../../components/FormSelectList';
import TypeToggle from 'src/app/components/ToggleType';
import { TextFieldContainer } from './style';

export interface IRecipeForm {
  recipe: IGetRecipe;
  ingredientList: IGetIngredient[];
  setPageState: React.Dispatch<React.SetStateAction<'list' | 'form'>>;
  setSelectedRecipe: React.Dispatch<React.SetStateAction<IGetRecipe>>;
  resetIngredients: () => Promise<void>;
}
const RecipeForm = ({ recipe, ingredientList, setPageState, setSelectedRecipe, resetIngredients }: IRecipeForm) => {
  const { ...configuration } = FormikConfiguration({
    recipe,
    setPageState,
    setSelectedRecipe,
    resetIngredients,
  });
  const formik = useFormik(configuration);

  return (
    <div className="body">
      <div className="grid-container">
        <form onSubmit={formik.handleSubmit}>
          <TextFieldContainer>
            <TypeToggle label="Type" name="type" formik={formik} />
            <FormInput label="Nom" name="name" inputType="text" placeholder="Nom..." formik={formik} />
            <FormInput label="Images" name="images" inputType="creatable" placeholder="URLs pour l'instant..." formik={formik} />
            <FormInput label="Portions" name="quantity" inputType="number" placeholder="Pour ... personne(s)" formik={formik} />
            <FormSelectList ingredients={ingredientList} recipe={recipe} setPageStage={setPageState} formik={formik} />
            <FormInput label="Étapes" name="steps" inputType="text" placeholder="..." formik={formik} />
            <FormInput label="Tags" name="tags" inputType="creatable" placeholder="Tags (max 3)..." formik={formik} />
            <SubmitButton type="submit" label="Confirmer" />
          </TextFieldContainer>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;
