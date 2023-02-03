import { IconButtonProps } from '@mui/material';

import { StyledIconButton } from './style';

export type TCustomIconButtonProps = IconButtonProps & {
  hasBorder?: boolean;
  transformY?: string;
};

const IconButton = ({
  id,
  children,
  hasBorder,
  transformY = '0px',
  ...props
}: TCustomIconButtonProps) => {
  return (
    <StyledIconButton
      id={id}
      hasBorder={hasBorder}
      transformY={transformY}
      {...props}
    >
      {children}
    </StyledIconButton>
  );
};

export default IconButton;
