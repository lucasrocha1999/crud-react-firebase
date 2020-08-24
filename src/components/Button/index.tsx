import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps {
  type: 'submit' | 'button';
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | any;
  disabled?: boolean;
};

const Button:React.FC<ButtonProps> = ({ children, onClick, ...rest }) => (
  <Container onClick={onClick} {...rest}>
    {children}
  </Container>
);

export default Button;
