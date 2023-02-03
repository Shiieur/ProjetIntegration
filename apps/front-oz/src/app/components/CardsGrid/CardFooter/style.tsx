import styled from "styled-components";

export const Footer = styled.div`
  display: grid;
  grid-template-columns: repeat(2,50%);
`;

export const BottomRight = styled.div` 
  justify-self: end;
  align-self: end; 
  margin: 10px;   
`;

export const BottomLeft = styled.div`  
  justify-self: start;
  align-self: end;  
  margin: 10px;
  
`;