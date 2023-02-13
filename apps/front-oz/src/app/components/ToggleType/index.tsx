import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import React from 'react';
import { Title } from '../FormInput/style';

interface ITypeToggleProps {
  label: string;
  name: string;
  formik: any;
}

const TypeToggle = ({ label, name, formik }: ITypeToggleProps) => {
  const handleChange = (event: React.MouseEvent<HTMLElement>, newType: string) => {
    formik.setFieldValue(name, newType);
  };

  console.log('formik.value[name]');
  console.log(formik.values[name]);

  return (
    <>
      <Title>
        <label>{label}</label>
      </Title>
      <ToggleButtonGroup color="primary" value={formik.values[name]?.toUpperCase()} onChange={handleChange} exclusive aria-label="Platform">
        <ToggleButton value="DRINK">
          <LocalBarIcon fontSize="large" />
        </ToggleButton>
        <ToggleButton value="MEAL">
          <LocalDiningIcon fontSize="large" />
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};

export default TypeToggle;
