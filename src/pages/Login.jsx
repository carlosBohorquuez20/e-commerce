import React from "react";
import { useEffect } from "react";
import { getProductsThunk } from "../store/slices/product.slice";
import { useDispatch } from "react-redux";
import "../styles/login.css";
const Login = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);

  return (
    <div>
      <h1> login</h1>
    </div>
  );
};

export default Login;
