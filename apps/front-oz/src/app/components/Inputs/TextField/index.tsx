import { IconButtonProps } from '@mui/material';

import { CustomTextField } from './style';

interface ITextField {
  placeholder: string;
}
const TextField = ({ placeholder }: ITextField) => {
  return (
    <CustomTextField
      id="outlined-basic"
      placeholder={placeholder}
      variant="outlined"
      size="small"
    />
  );
};

export default TextField;
