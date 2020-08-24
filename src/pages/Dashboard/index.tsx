import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { firebase } from "../../auth/config";
import "firebase/firestore";

import { Container, Form, Button, List } from './styles';

interface ExpenseData {
  value: number | undefined;
  description: string;
  date: any;
  paid: any;
}

const Dashboard: React.FC = () => {
  const now = new Date;
  const history = useHistory();

  const [register, setRegister] = useState<any[]>([]);
  const [editionMode, setEditionMode] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<string>('');

  const [values, setValues] = useState({
    value: undefined,
    description: "",
    date: now.getTime(),
    paid: "",
  } as ExpenseData);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try{
      const db = firebase.firestore();
      const data = await db.collection('despesa').get();
      const dataRegister = data.docs.map((el) => ({
        id: el.id,
        ...el.data()
      }))
      setRegister(dataRegister);
    } catch (error) {
      console.log(error);
    }
  };

  const activeEditionMode = async (item: any) => {
    setEditionMode(true);
    setTaskId(item.id);
  }

  const handleChange = (event: any) => {
    event.persist();

    if (event.target.value === 'true') {
      setValues(values => ({
        ...values,
        [event.target.name]: true
      }));
      return
    }

    if (event.target.value === 'false') {
      setValues(values => ({
        ...values,
        [event.target.name]: false
      }));
      return
    }

    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  }

  const handleClick = (event: any) => {
    event.preventDefault();

    firebase
    .auth()
    .signOut()
    .then(res => {
      history.push("/signin");
    })
  }

  const addRegister = async(event: any) => {
    event.preventDefault();

    try{
      const db = firebase.firestore();
      const newRegister = {
        value: values.value,
        description: values.description,
        date: values.date,
        paid: values.paid,
      }
      const data = await db.collection('despesa').add(newRegister);

      setRegister([
        ...register,
        {
          ...newRegister,
          id: data.id
        }
      ]);

    } catch (error) {
      console.log(error);
    }
  }

  const deleteRegister = async (id: string) => {

    try {
      const db =  firebase.firestore();
      await db.collection('despesa').doc(id).delete();

      setRegister(
        register.filter((item) => item.id !== id)
      )

    } catch (err) {
      console.log(err)
    }
  }

  const editRegister = async (e: any) => {
    e.preventDefault()

    try {
      const db = firebase.firestore()
      await db.collection('despesa').doc(taskId).update({
        value: values.value,
        description: values.description,
        date: values.date,
        paid: values.paid,
      })
      const arrayEdit = register.map(item => (
        item.id === taskId ? {
          id: item.id,
          value: item.value,
          description: item.description,
          date: item.date,
          paid: item.paid
        } : item
      ))
      setRegister(arrayEdit)
      setEditionMode(false)
      setTaskId('')

    } catch (error) {
      console.log(error)
    }
}
  return (
    <Container>
      <h1>Dashboard</h1>
      <button onClick={handleClick}>Logout</button>

      <Form>
        <input
          name="value"
          type="number"
          placeholder="Valor"
          onChange={handleChange}
        />
        <input
          name="description"
          type="text"
          placeholder="Descrição"
          onChange={handleChange}
        />
        <input
          name="date"
          type="date"
          placeholder="Data"
          onChange={handleChange}
        />
        <select
          name="paid"
          onChange={handleChange}
        >
          <option disabled>Pago?</option>
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>

        <Button type="submit" onClick={addRegister}>Cadastrar</Button>
      </Form>

      <List>
        <thead>
          <tr>
            <th>Valor</th>
            <th>Descrição</th>
            <th>Data</th>
            <th>Pago?</th>
          </tr>
        </thead>
        <tbody>
          {register && register.length ? register.map((item) => (
            <tr key={item.id}>
              <td>{item.value}</td>
              <td>{item.description}</td>
              <td>{item.date}</td>
              <td>{item.paid.toString()}</td>
              <td>
                <button
                  onClick={() => deleteRegister(item.id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <button
                  onClick={() => activeEditionMode(item)}
                >
                  Edit
                </button>
              </td>
            </tr>
          )): null}
        </tbody>
      </List>
    </Container>
   );

}
export default Dashboard;
