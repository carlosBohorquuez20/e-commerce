import React from "react";
import { useEffect } from "react";
import { getProductsThunk } from "../store/slices/product.slice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import "../styles/login.css";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import { useState } from "react";
const Login = ({ modalNav, setModalNav }) => {
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const [errorLogin, setErrorLogin] = useState("");
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
          setErrorLogin("Invalid credentials");
        } else {
          console.log(error.response?.data);
        }
      });
  };

  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);

  const modalActive = () => {
    setModalNav(true);
  };

  return (
    <div className="login-container">
      <div className="login-center">
        <div className="menu-login">
          <i
            onClick={modalActive}
            class="fa-solid fa-bars menu-mobile black-menu"
          ></i>
        </div>
        <form action="" onSubmit={handleSubmit(submit)}>
          <h3>Login</h3>
          <div className="test-data">
            <p>Test data</p>
            <div className="usuario-demo">
              <p>
                <i class="fa-solid fa-envelope"></i> john@gmail.com
              </p>
              <p>
                <i class="fa-solid fa-lock"></i> john1234
              </p>
            </div>
          </div>
          <div className="input-form-box">
            <label htmlFor="email">Email adress</label>
            <input
              type="email"
              required
              placeholder="Enter email"
              {...register("email")}
            />
          </div>
          <div className="input-form-box">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              placeholder="Password"
              {...register("password")}
            />
          </div>
          <p>{errorLogin}</p>
          <div className="button-login">
            <button type="submit">Login</button>
          </div>
          <div>
            <p>
              Don't have an account?{" "}
              <Link to={"/register"} className="link-singup">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
