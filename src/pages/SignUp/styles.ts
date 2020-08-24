import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: calc(100vh - 100px);
`;

export const Form = styled.div`
  background: ${(props) => props.theme.colors.primary};
  width: 30%;
  padding: 12px 20px;
  min-width: 300px;
  border-radius: 5px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    font-size: 1.6rem;
    margin: 20px 0;
  }

  input {
    padding: 8px 3px;
    margin: 5px 0;
    border: 0;
    border-radius: 5px;
  }

  div {
    display: flex;

    margin: 20px 0;
    button {
      margin: 0 5px;
    }
  }
`;
