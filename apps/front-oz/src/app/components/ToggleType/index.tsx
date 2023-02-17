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

  return (
    <>
      <Title>
        <label>{label}</label>
      </Title>
      <ToggleButtonGroup color="primary" value={formik.values[name]} onChange={handleChange} exclusive aria-label="Platform">
        <ToggleButton value="Drink">
          <LocalBarIcon fontSize="large" />
        </ToggleButton>
        <ToggleButton value="Meal">
          <LocalDiningIcon fontSize="large" />
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};

export default TypeToggle;
