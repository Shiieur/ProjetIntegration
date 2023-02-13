import styled from 'styled-components';
import { colors } from '../../../../assets/colors';

export const TextFieldContainer = styled.div`
  display: grid;
  background-color: ${colors.turquoise};
  grid-auto-flow: row;
  grid-gap: 5px;
  padding: 30px;
  justify-items: center;
`;

export const FormInput = styled.div`
  background-color: ${colors.green};
`;
