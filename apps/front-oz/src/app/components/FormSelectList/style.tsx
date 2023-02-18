import styled from 'styled-components';
import { colors } from '../../../assets/colors';

export const IngredientList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, auto);
  padding: 30px;
`;

export const IngredientBox = styled.div`
  display: grid;
  grid-auto-flow: row;
  border: 2px solid ${colors.green};
  border-style: groove;
  padding: 30px;
  border-radius: 20px;
`;

export const Title = styled.div`
  color: white;
  position: relative;
  left: 35px;
  bottom: 15px;
`;
