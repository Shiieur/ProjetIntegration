import './styles.css';
import React, { Fragment } from 'react';
import Select from 'react-select';

interface IProps {
  ingredientsOptions: {
    value: number;
    label: string;
  }[];
  onSelectChange: (values: { value: number; label: string }) => void;
  defaultValue?: { value: number; label: string };
}

const FormSelect = ({
  ingredientsOptions,
  onSelectChange,
  defaultValue,
}: IProps) => {
  return (
    <Fragment>
      <Select
        className="basic-single"
        classNamePrefix="select"
        isDisabled={false}
        isLoading={false}
        isClearable={true}
        isRtl={false}
        isSearchable={true}
        name={'ingredients'}
        options={ingredientsOptions}
        defaultValue={defaultValue ?? 'Nothing'}
        value={defaultValue ?? 'Nothing'}
        onChange={(values) =>
          onSelectChange(values as { value: number; label: string })
        }
      />
      <div
        style={{
          color: 'hsl(0, 0%, 40%)',
          display: 'inline-block',
          fontSize: 12,
          fontStyle: 'italic',
          marginTop: '1em',
        }}
      ></div>
    </Fragment>
  );
};
export default FormSelect;
