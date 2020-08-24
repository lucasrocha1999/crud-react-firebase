import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import { firebase } from "../../auth/config";
import { AuthContext } from "../../auth/AuthContext";

import "firebase/auth";
import "firebase/firestore";

import Button from '../../components/Button';

import { Container, Form } from './styles';

interface UserData {
    email: string;
    password: string;
}

const SignIn = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const [values, setValues] = useState({
      email: "",
      password: ""
  } as UserData);

  const handleClick = () => {
    history.push("/signup");
  }

  const handleChange = (event: any) => {
    event.persist();

    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();

    firebase
    .auth()
    .signInWithEmailAndPassword(values.email, values.password)
    .then(res => {
      // authContext.setUser(res);
      console.log(res, 'res')
      history.push("/");
    })
    .catch(error => {
      console.log(error.message);
      alert(error.message);
    });
  }

  return (
     <Container>
      <Form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="text"
          name="email"
          value={values.email}
          placeholder="Enter your Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={values.password}
          placeholder="Enter your Password"
          onChange={handleChange}
        />

        <div>
          <Button type="submit">Entrar</Button>
          <Button onClick={handleClick} type="button">Cadastrar</Button>
        </div>
      </Form>
    </Container>
  );
}
export default SignIn;
