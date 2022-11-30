import React from "react";
import { useEffect } from "react";
import { getProductsThunk } from "../store/slices/product.slice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import "../styles/login.css";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const Login = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const submit = (data) => {
    console.log(data);
    axios
    .post(`https://e-commerce-api.academlo.tech/api/v1/users/login`, data)
    .then((res) => {
      navigate("/");
      console.log(res);
      localStorage.setItem("token", res.data.data.token); // res.data.data.token
    })
    .catch((error) => {
      if (error.response?.status === 404) {
        alert("Credenciales incorrectas");
      } else {
        console.log(error.response?.data);
      }
    });
  };

  useEffect(() => {
    dispatch(getProductsThunk());
  
  }, []);

  return (
    <div className="login-container">
     <Form
      onSubmit={handleSubmit(submit)}
      style={{ maxWidth: 500, margin: "0 auto" }}
    >
      <h1>Login</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          {...register("email")}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          {...register("password")}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  );
};

export default Login;
