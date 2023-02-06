import './styles.css';
import CreatableSelect from 'react-select/creatable';

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

const FormInput = ({
  label,
  name,
  inputType,
  placeholder,
  options,
  formik,
}: IProps) => {
  return (
    <>
      {inputType === 'text' && (
        <>
          <label htmlFor={name}>{label}</label>
          <input
            name={name}
            type={inputType}
            placeholder={placeholder}
            value={formik.values[name]}
            onChange={formik.handleChange}
          />
          <p>{formik.errors[name]}</p>
        </>
      )}
      {inputType === 'number' && (
        <>
          <label htmlFor={name}>{label}</label>
          <input
            name={name}
            type={inputType}
            placeholder={placeholder}
            value={formik.values[name]}
            onChange={formik.handleChange}
          />
          <p>{formik.errors[name]}</p>
        </>
      )}
      {inputType === 'checkbox' && (
        <>
          <label htmlFor={name}>{label}</label>
          <input
            name={name}
            type={inputType}
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <p>{formik.errors[name]}</p>
        </>
      )}
      {inputType === 'creatable' && (
        <>
          <label htmlFor={name}>{label}</label>
          <CreatableSelect isMulti
            value={formik.values.images}
            onChange={(assignedImage) => formik.setFieldValue('images', assignedImage)}
          />
          <p>{formik.errors[name]}</p>
        </>
      )}

      {inputType === 'select' && (
        <>
          <label htmlFor={name}>{label}</label>
          <select
            name={name}
            value={formik.values[name]}
            onChange={formik.handleChange}
          >
            <option value="" disabled selected hidden>
              Select a {label}
            </option>
            {options?.map((option) => (
              <option value={option}>{option}</option>
            ))}
          </select>
          <p>{formik.errors[name]}</p>
        </>
      )}
    </>
  );
};

export default FormInput;
