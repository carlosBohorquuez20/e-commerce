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
    <>
    <nav>
      <div className="top-nav">
        <div className="left-container">
          <p>
            !Hello¡{" "}
            <Link as={Link} to="/login">
              Login
            </Link>{" "}
            or{" "}
            <Link as={Link} to="/register">
              Register
            </Link>
          </p>
          <Link as={Link} to="/purchases">
            <p>Purchases</p>
          </Link>

          <p>Help & Contact</p>
        </div>
        <div className="right-container">
          <p>Ship to</p>
          <p>
            {" "}
            <i className="fa-solid fa-globe"></i> English
          </p>
          <p>Sell</p>
          <p>Watchlist </p>
          <button>
            {" "}
            <i className="fa-solid fa-bell"></i>
          </button>
          <button onClick={handleShow}>
            {" "}
            <i className="fa-solid fa-cart-shopping"></i>
          </button>
        </div>
      </div>
      <div className="input-nav">
        <h2>
          <Link to={"/"}>E-commerce</Link>
        </h2>
        <div className="all-category-input">
          <input
            placeholder="Search for anything"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <select name="All Categories" id="">
            <option selected>All categories</option>
            {categoriesList.map((category) => (
              <option
                key={category.id}
                onClick={() => dispatch(filterProductsThunk(category.id))}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button onClick={() => {dispatch(SerchProductsThunk(searchInput))}}>
          Search
        </button>
      </div>
    </nav>
        <PurchaseSidebars show={show} handleClose={handleClose}/>
    </>
  );
};

export default NavBar;
<h1>navbar</h1>;
