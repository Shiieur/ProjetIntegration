import { IconButtonProps } from '@mui/material';
import { useState } from 'react';

import { CustomTextField } from './style';

interface ITextField {
  placeholder: string;
  type: string;
  setRecipeFilterSearch: React.Dispatch<React.SetStateAction<string>>;
  setIngredientFilterSearch: React.Dispatch<React.SetStateAction<string>>;
}

const TextField = ({ placeholder, type, setRecipeFilterSearch, setIngredientFilterSearch }: ITextField) => {
  const [fieldValue, setFieldValue] = useState<string>('');

  const handleChange = (newValue: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newFieldValue = newValue.target.value;
    setFieldValue(newFieldValue);
    if (type === 'Recipe') setRecipeFilterSearch(newFieldValue);
    else if (type === 'Ingredient') setIngredientFilterSearch(newFieldValue);
  };

  return <CustomTextField id="outlined-basic" placeholder={placeholder} variant="outlined" size="small" value={fieldValue} onChange={(newValue) => handleChange(newValue)} />;
};

export default TextField;
