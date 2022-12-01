import React from "react";
import { useEffect } from "react";
import { getProductsThunk } from "../store/slices/product.slice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import "../styles/register.css";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";

const Register = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const submit = (data) => {
    axios
      .post(`https://e-commerce-api.academlo.tech/api/v1/users`, data)
      .then(() => {
        navigate("/");
      })
  };

  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);
  return (
    <div className="register-container">
      <div className="register-center">
        <form action="" onSubmit={handleSubmit(submit)}>
          <h3>Register</h3>
          <div className="input-form-box-register">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              placeholder="First Name"
              required
              {...register("firstName")}
            />
          </div>
          <div className="input-form-box-register">
            <label htmlFor="Last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              placeholder="Last Name"
              required
              {...register("lastName")}
            />
          </div>
          <div className="input-form-box-register">
            <label htmlFor="email">Email adress</label>
            <input
              type="email"
              placeholder="Enter email"
              required
              {...register("email")}
            />
          </div>
          <div className="input-form-box">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
              {...register("password")}
            />
          </div>
          <div className="input-form-box-register">
            <label htmlFor="phone">Phone (Must be 10 digits long)</label>
            <input
              type="text"
              id="phone"
              placeholder="Phone"
              required
              {...register("phone")}
            />
          </div>
          <div className="button-register">
            <button type="submit">Register</button>
          </div>
          <div className="phone-number">
            <p>
              Already have an account? <Link to={"/login"} className="link-login">Log in</Link>
            </p>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
