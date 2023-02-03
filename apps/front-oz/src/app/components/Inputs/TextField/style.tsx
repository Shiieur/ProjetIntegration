import { styled } from '@mui/material/styles';
import MuiTextField from '@mui/material/TextField';

import { colors } from '../../../../assets/colors';

export const CustomTextField = styled(MuiTextField)((props) => ({
  backgroundColor: colors.turquoise,
  borderRadius: '25px',
  input: {
    color: colors.green,
  },
  [`& fieldset`]: {
    borderRadius: 25,
    border: `3px solid ${colors.green}`,
  },
  '& label.Mui-focused': {
    color: `${colors.green}`,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: `${colors.green}`,
    },
    '&:hover fieldset': {
      borderColor: `${colors.green}`,
    },
    '&.Mui-focused fieldset': {
      borderColor: `${colors.white}`,
    },
  },
}));
