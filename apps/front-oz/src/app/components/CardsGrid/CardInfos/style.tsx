import styled from 'styled-components';
import { colors } from '../../../../assets/colors'

interface CardProps {
  image: string;
}

export const Card = styled.div<CardProps>`
  display: grid;
  grid-template-columns: repeat(2,50%);  
  border: 1px solid white;   
  background-image: url(${p => p.image});
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 600px;
`;

export const Infos = styled.div`
  display: grid;
  grid-template-rows: 20% 60% 20%;
  background-color: hsl(182, 100%, 20%, 80%);
`;

export const Title = styled.div`  
  justify-self: center;
  align-self: end; 
  color: ${colors.white};
  font-weight: bold;
  font-size: 200%;
  text-align: center;
`;