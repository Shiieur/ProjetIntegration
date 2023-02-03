import React from 'react';
import { Field, useFormik } from 'formik';
import './styles.css';
import FormikConfiguration from './FormikConfiguration';
import FormInput from '../../../components/FormInput';
import SubmitButton from '../../../components/SubmitButton';
import { IIngredient } from '../../../utils/interfaces';

export interface IIngredientForm {
  ingredient?: IIngredient;
  setPageState: React.Dispatch<React.SetStateAction<'list' | 'form'>>;
}
const IngredientForm = ({ ingredient, setPageState }: IIngredientForm) => {
  const { ...configuration } = FormikConfiguration({
    ingredient,
    setPageState,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formik: any = useFormik(configuration);

  return (
    <div className="body">
      <div className="grid-container">
        <form onSubmit={formik.handleSubmit}>
          <FormInput
            label="Nom"
            name="name"
            inputType="text"
            placeholder="Nom..."
            formik={formik}
          />
          <FormInput
            label="Image"
            name="image[0].url"
            inputType="text"
            placeholder="URL..."
            formik={formik}
          />
          <FormInput
            label="Alcolisé"
            name="alcoholic"
            inputType="checkbox"
            formik={formik}
          />          
          <SubmitButton type="submit" label="Confirm" />
        </form>
      </div>
    </div>
  );
};

export default IngredientForm;
