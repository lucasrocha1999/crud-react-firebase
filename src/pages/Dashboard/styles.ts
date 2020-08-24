import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  margin: 20px auto;
  height: calc(100vh - 100px);
`;

export const Form = styled.form`
  display: flex;
  margin: 20px 0 30px 0;

  h1 {
    font-size: 1.6rem;
    margin: 20px 0;
  }

  input {
    background: transparent;
    padding: 8px 3px;
    margin: 5px 5px;
    border: 1px solid #d3d3d3;
    border-radius: 5px;
  }

  select {
    background: transparent;
    padding: 8px 3px;
    margin: 5px 5px;
    border: 1px solid #d3d3d3;
    border-radius: 5px;
  }
`;

export const Button = styled.button`
    background: #01DF01;
    padding: 8px 3px;
    margin: 5px 5px;
    border: 1px solid #d3d3d3;
    border-radius: 5px;

    &:hover {
      background: ${(props) => shade(0.1, '#01DF01')};
    }
`;

export const List = styled.table`
  width: 100%;
  color: ${(props) => props.theme.colors.text};

  & th {
    text-align: start;
  }

  & td {
    padding: 10px 0;
  }
`;
