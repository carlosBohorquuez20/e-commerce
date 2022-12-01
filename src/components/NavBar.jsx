import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProductsThunk,
  filterProductsThunk,
  SerchProductsThunk,
} from "../store/slices/product.slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import { Offcanvas } from "react-bootstrap";
import PurchaseSidebars from "./PurchaseSidebars";
import "../styles/navBar.css";
const NavBar = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  const [categoriesList, setCategoriesList] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  useEffect(() => {
    dispatch(getProductsThunk());
    axios
      .get("https://e-commerce-api.academlo.tech/api/v1/products/categories/")
      .then((res) => setCategoriesList(res.data.data.categories));
  }, []);

  return (
 
    <nav>
      <div className="nav-container">
        <div className="left-container">
          <div className="icons-nav">
          <Link to={"/"}>
            <i className="fa-solid fa-house"></i>
            <p>Home</p>
          </Link>
          </div>
          <div className="icons-nav">
          <Link as={Link} to="/login">
            <i className="fa-solid fa-user"></i>
            <p>Login</p>
            </Link>
          </div>
          <div className="icons-nav">
          <Link as={Link} to="/register">
            <i className="fa-solid fa-user-plus"></i>
            <p>Register</p>
            </Link>
          </div>
          <div className="icons-nav">
          <Link as={Link} to="/purchases">
            <i className="fa-solid fa-store"></i>
           <p>Purchases</p>
          </Link>
          </div>
        </div>
        <div className="cart-container">
            <i onClick={handleShow} className="fa-solid fa-cart-shopping"></i>
        </div>
        <PurchaseSidebars show={show} handleClose={handleClose}/>
      </div>
    </nav>
  );
};

export default NavBar;
<h1>navbar</h1>;
