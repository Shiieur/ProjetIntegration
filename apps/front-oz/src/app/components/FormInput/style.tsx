import styled from 'styled-components';
import { colors } from '../../../assets/colors';

export const Title = styled.div`
  color: ${colors.white};
`;

export const Error = styled.div`
  color: ${colors.white};
  font-style: italic;
  font-size: smaller;
`;

export const InputContainer = styled.div`
  background-color: ${colors.turquoise};
  border: 2px solid ${colors.green};
  border-radius: 30px;
  :focus {
    background-color: ${colors.green};
    border: 2px solid ${colors.gray};
  }
`;
