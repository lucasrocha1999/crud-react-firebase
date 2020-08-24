import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import { firebase } from "../../auth/config";
import { AuthContext } from "../../auth/AuthContext";

import Button from '../../components/Button';

import { Container, Form } from './styles';

import "firebase/auth";
import "firebase/firestore";

interface FormItems {
  username: string;
  phone: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const authContext = useContext(AuthContext);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    phone: ""
  } as FormItems);

  const history = useHistory();

  const handleClick = () => {
    history.push("/signin")
  }

  const handleChange = (event: any) => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  }

  const handleSubmit = (event: any) => {
    event?.preventDefault();

    firebase
    .auth()
    .createUserWithEmailAndPassword(values.email, values.password)
    .then((userCredential : firebase.auth.UserCredential) => {
        // authContext.setUser(userCredential);
        const db = firebase.firestore();
        db.collection("Users")
         .doc(userCredential.user!.uid)
         .set({
            email: values.email,
            username: values.username,
            phone: values.phone
        });
        history.push("/dashboard");
       })
       .catch(error => {
        console.log(error.message);
        alert(error.message);
    })
  }

  return (
    <Container>
      <Form>
        <h1>Cadastrar</h1>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Enter your Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your Password"
          onChange={handleChange}
        />

        <div>
          <Button onClick={handleSubmit} type="submit">Cadastrar</Button>
          <Button onClick={handleClick} type="button">Login</Button>
        </div>
      </Form>
     </Container>
   );
}
export default SignUp;
