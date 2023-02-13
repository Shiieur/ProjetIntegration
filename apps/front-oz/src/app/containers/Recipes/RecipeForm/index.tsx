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
            <FormInput label="Name" name="name" inputType="text" placeholder="Name..." formik={formik} />
            <FormInput label="Images" name="images" inputType="creatable" placeholder="Image link (for now)..." formik={formik} />
            <FormInput label="Recipe Quantity" name="quantity" inputType="number" placeholder="Quantity (in liters)" formik={formik} />
            <FormSelectList ingredients={ingredientList} recipe={recipe} setPageStage={setPageState} formik={formik} />
            <FormInput label="Steps" name="steps" inputType="text" placeholder="Steps (will keep the html)" formik={formik} />
            <FormInput label="Tags" name="tags" inputType="creatable" placeholder="Tags (max 3)..." formik={formik} />
            <SubmitButton type="submit" label="Confirm" />
          </TextFieldContainer>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;
