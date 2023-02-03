import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

import { colors } from '../../../assets/colors';
import { TCustomIconButtonProps } from './';

export const StyledIconButton = styled(IconButton)<TCustomIconButtonProps>(
  (props) => ({
    backgroundColor: colors.black,
    color: 'white',
    height: '50px',
    width: '50px',
    borderRadius: '50px',
    border: props.hasBorder ? '1px solid white' : 'none',
    transform: `translateY(${props.transformY})`,
    '&:hover': {
      backgroundColor: colors.gray,
    },
  })
);
