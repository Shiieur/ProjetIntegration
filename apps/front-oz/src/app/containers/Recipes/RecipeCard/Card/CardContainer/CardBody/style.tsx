import styled from 'styled-components';
import { colors } from '../../../../../../../assets/colors';

export const ColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
  background-color: ${colors.turquoise};
  color: ${colors.white};
  grid-auto-flow: column;
  grid-gap: 10px;
`;

export const RowGrid = styled.div`
  display: grid;
  grid-template-rows: 10% 10% 20% 60%;
  color: ${colors.white};
  grid-auto-flow: row;
  grid-gap: 10px;
`;
export const Image = styled.img``;
