import CreatableSelect from 'react-select/creatable';
import { InputContainer, Title, Error } from './style';

interface IProps {
  label: string;
  name: string;
  inputType: string;
  placeholder?: string;
  checked?: boolean;
  options?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any;
}

const FormInput = ({ label, name, inputType, placeholder, options, formik }: IProps) => {
  return (
    <>
      {inputType === 'text' && (
        <>
          <Title>
            <label htmlFor={name}>{label}</label>
          </Title>
          <InputContainer>
            <input name={name} type={inputType} placeholder={placeholder} value={formik.values[name]} onChange={formik.handleChange} />
          </InputContainer>
          <Error>
            <p>{formik.errors[name]}</p>
          </Error>
        </>
      )}
      {inputType === 'number' && (
        <>
          <Title>
            <label htmlFor={name}>{label}</label>
          </Title>
          <InputContainer>
            <input name={name} type={inputType} placeholder={placeholder} value={formik.values[name]} onChange={formik.handleChange} />
          </InputContainer>

          <Error>
            <p>{formik.errors[name]}</p>
          </Error>
        </>
      )}
      {inputType === 'checkbox' && (
        <>
          <Title>
            <label htmlFor={name}>{label}</label>
          </Title>
          <InputContainer>
            <input name={name} type={inputType} value={formik.values[name]} checked={formik.values[name]} onChange={formik.handleChange} />
          </InputContainer>
          <Error>
            <p>{formik.errors[name]}</p>
          </Error>
        </>
      )}
      {inputType === 'creatable' && (
        <>
          <Title>
            <label htmlFor={name}>{label}</label>
          </Title>
          <InputContainer>
            <CreatableSelect isMulti value={formik.values[name]} onChange={(value) => formik.setFieldValue(name, value)} />
          </InputContainer>
          <Error>
            <p>{formik.errors[name]}</p>
          </Error>
        </>
      )}

      {inputType === 'select' && (
        <>
          <Title>
            <label htmlFor={name}>{label}</label>
          </Title>
          <InputContainer>
            <select name={name} value={formik.values[name]} onChange={formik.handleChange}>
              <option value="" disabled selected hidden>
                Select a {label}
              </option>
              {options?.map((option) => (
                <option value={option}>{option}</option>
              ))}
            </select>
          </InputContainer>
          <Error>
            <p>{formik.errors[name]}</p>
          </Error>
        </>
      )}
    </>
  );
};

export default FormInput;
