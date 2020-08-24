import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: ${(props) => props.theme.colors.background};
  border-radius: 10px;
  border: 0px;
  padding: 8px 16px;
  color: ${(props) => props.theme.colors.text};
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2;

  &:hover {
    background: ${(props) => shade(0.1, props.theme.colors.background)};
  }
`;
