import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import {
  getProductsThunk,
  filterProductsThunk,
  SerchProductsThunk,
} from "../store/slices/product.slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import { Modal, Offcanvas } from "react-bootstrap";
import PurchaseSidebars from "./PurchaseSidebars";
import "../styles/navBar.css";

const NavBar = ({ modalNav, setModalNav }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  const [categoriesList, setCategoriesList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  //const [modalNav, setModalNav] = useState(false);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setShow(true);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    dispatch(getProductsThunk());
    axios
      .get("https://e-commerce-api.academlo.tech/api/v1/products/categories/")
      .then((res) => setCategoriesList(res.data.data.categories));
  }, []);

  const closeModal = () => {
    setModalNav(false);
  };

  return (
    <nav
      className={`${modalNav == true ? "modal-active" : "modal-desactive"} `}
    >
      <div className="nav-container">
        <i onClick={closeModal} className={`fa-solid fa-x close-icon`}></i>
        <div className="left-container">
          <div className="icons-nav">
            <Link to={"/"} onClick={closeModal}>
              <i className="fa-solid fa-house"></i>
              <p>Home</p>
            </Link>
          </div>
          <div className="icons-nav">
            <Link as={Link} to="/login" onClick={closeModal}>
              <i className="fa-solid fa-user"></i>
              <p>Login</p>
            </Link>
          </div>
          <div className="icons-nav">
            <Link as={Link} to="/register" onClick={closeModal}>
              <i className="fa-solid fa-user-plus"></i>
              <p>Register</p>
            </Link>
          </div>
          <div className="icons-nav">
            <Link as={Link} to="/purchases" onClick={closeModal}>
              <i className="fa-solid fa-store"></i>
              <p>Purchases</p>
            </Link>
          </div>
        </div>
        <div className="cart-container">
          <i onClick={handleShow} className="fa-solid fa-cart-shopping"></i>
        </div>
        <PurchaseSidebars show={show} handleClose={handleClose} />
      </div>
    </nav>
  );
};

export default NavBar;
<h1>navbar</h1>;
