import styled from 'styled-components';
import { colors } from '../../../../../../../assets/colors';

interface ImagesProps {
  image: string;
}

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  background-color: ${colors.turquoise};
  color: ${colors.white};
  grid-gap: 10px;
`;

export const InfosGrid = styled.div`
  display: grid;
  grid-template-rows: 10% 10% 20% 60%;
  color: white;
  grid-auto-flow: row;
  grid-gap: 10px px;
  align-items: center;
  justify-items: center;
`;

export const Images = styled.div<ImagesProps>`
  background-image: url(${(p) => p.image});
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 800px;
`;

export const TopInfos = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`;

export const IngredientList = styled.div`
  display: grid;
  color: ${colors.white};
`;

export const Rowing = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-items: start;
  align-items: end;
`;

export const ImageIngredient = styled.div<ImagesProps>`
  background-image: url(${(p) => p.image});
  background-size: cover;
  width: 30px;
  height: 30px;
`;

export const WhiteText = styled.div`
  color: ${colors.white};
`;
