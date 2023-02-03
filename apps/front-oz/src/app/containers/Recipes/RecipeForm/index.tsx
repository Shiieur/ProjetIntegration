import { useFormik } from 'formik';
import './styles.css';
import FormikConfiguration from './FormikConfiguration';
import FormInput from '../../../components/FormInput';
import SubmitButton from '../../../components/SubmitButton';
import { IIngredient, IRecipe } from '../../../utils/interfaces';
import FormSelectList from '../../../components/FormSelectList';

export interface IRecipeForm {
  recipe: IRecipe;
  ingredientList: IIngredient[];
  setPageState: React.Dispatch<React.SetStateAction<'list' | 'form'>>;
  setSelectedRecipe: React.Dispatch<React.SetStateAction<IRecipe>>;
  resetIngredients: () => Promise<void>;
}
const RecipeForm = ({
  recipe,
  ingredientList,
  setPageState,
  setSelectedRecipe,
  resetIngredients,
}: IRecipeForm) => {
  const { ...configuration } = FormikConfiguration({
    recipe,
    setPageState,
    setSelectedRecipe,
    resetIngredients,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formik: any = useFormik(configuration);

  return (
    <div className="body">
      <div className="grid-container">
        <form onSubmit={formik.handleSubmit}>
          <FormInput
            label="Name"
            name="name"
            inputType="text"
            placeholder="Name..."
            formik={formik}
          />
          <FormInput
            label="Image"
            name="image"
            inputType="text"
            placeholder="Image link (for now)..."
            formik={formik}
          />
          <FormInput
            label="Recipe Quantity"
            name="quantity"
            inputType="number"
            placeholder="Quantity (in liters)"
            formik={formik}
          />
          <FormSelectList
            ingredients={ingredientList}
            recipe={recipe}
            setPageStage={setPageState}
            formik={formik}
          />
          <FormInput
            label="Steps"
            name="steps"
            inputType="text"
            placeholder="Steps (will keep the html)"
            formik={formik}
          />
          <SubmitButton type="submit" label="Confirm" />
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;
