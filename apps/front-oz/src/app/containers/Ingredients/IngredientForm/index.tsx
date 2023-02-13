import React from 'react';
import { useFormik } from 'formik';
import './styles.css';
import FormikConfiguration from './FormikConfiguration';
import FormInput from '../../../components/FormInput';
import SubmitButton from '../../../components/SubmitButton';
import { IGetIngredient } from '../../../utils/interfaces';
import { TextFieldContainer } from '../../Recipes/RecipeForm/style';

export interface IIngredientForm {
  ingredient?: IGetIngredient;
  setPageState: React.Dispatch<React.SetStateAction<'list' | 'form'>>;
}
const IngredientForm = ({ ingredient, setPageState }: IIngredientForm) => {
  const { ...configuration } = FormikConfiguration({
    ingredient,
    setPageState,
  });
  const formik = useFormik(configuration);

  return (
    <div className="body">
      <div className="grid-container">
        <form onSubmit={formik.handleSubmit}>
          <TextFieldContainer>
            <FormInput label="Nom" name="name" inputType="text" placeholder="Nom..." formik={formik} />
            <FormInput label="Image" name="imageUrl" inputType="text" placeholder="URL..." formik={formik} />
            <FormInput label="Alcolisé" name="alcoholic" inputType="checkbox" formik={formik} />
            <SubmitButton type="submit" label="Confirm" />
          </TextFieldContainer>
        </form>
      </div>
    </div>
  );
};

export default IngredientForm;
