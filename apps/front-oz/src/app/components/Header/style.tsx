import AnimateHeight from 'react-animate-height';
import styled from 'styled-components';
import { colors } from '../../../assets/colors';

export const Container = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-items: center;
  background: ${colors.black};
`;

export const StyledContainer = styled(AnimateHeight)((props) => ({
  background: colors.black,
  border: `2px solid ${colors.white}`,
}));

export const TextFieldContainer = styled.div`
  display: grid;  
  grid-auto-flow: row;
  grid-gap: 5px;
  margin-top: 30px;
  justify-items: center;
`;
