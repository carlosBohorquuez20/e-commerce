import React from "react";
import { useState, useEffect } from "react";
import {
  getProductsThunk,
  filterProductsThunk,
  SerchProductsThunk,
} from "../store/slices/product.slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import axios from "axios";
import "../styles/home.css";
import "../styles/footer.css";
import { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";
//images
import black1 from "../img/black1.png";
import controle from "../img/controle.png";
import mobile from "../img/mobile.png";
import laptop from "../img/laptop.png";
import tv from "../img/tv.png";
import kitchen from "../img/Kitchen.png";
import Footer from "../components/Footer";
const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  const [categoriesList, setCategoriesList] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    dispatch(getProductsThunk());
    axios
      .get("https://e-commerce-api.academlo.tech/api/v1/products/categories/")
      .then((res) => setCategoriesList(res.data.data.categories));
  }, []);

  console.log(categoriesList);
  return (
    <div className="home-container">
      <div className="home-center-box">
      <div className="input-container">
        <input
          placeholder="Apple, Samsung, Macbook, ..."
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          onClick={() => {
            dispatch(SerchProductsThunk(searchInput));
          }}
        >
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      <div className="home-middle">
        <ul className="box-category">
          <li
            onClick={() => dispatch(filterProductsThunk(categoriesList[0]?.id))}
          >
            <div>
              <i class="fa-solid fa-kitchen-set"></i>
            </div>
            {categoriesList[0]?.name}
          </li>
          <li
            onClick={() => dispatch(filterProductsThunk(categoriesList[1]?.id))}
          >
            <div>
              <i class="fa-solid fa-tv"></i>
            </div>
            {categoriesList[1]?.name}
          </li>
          <li
            onClick={() => dispatch(filterProductsThunk(categoriesList[2]?.id))}
          >
            <div>
              <i class="fa-solid fa-mobile"></i>
            </div>
            {categoriesList[2]?.name}
          </li>
          <li
            onClick={() => dispatch(filterProductsThunk(categoriesList[3]?.id))}
          >
            <div>
              <i class="fa-solid fa-laptop"></i>
            </div>
            {categoriesList[3]?.name}
          </li>
        </ul>
      </div>
      <ul className="list-product">
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>
              <div className="img-home-product">
                <img src={product.productImgs[0]} alt="product image" />
              </div>
              <div className="line-card"></div>
              <p className="name-product">{product.title}</p>
              <div className="price-home">
                <div>
                  <p>
                    Price <br />
                    <b>${product.price}</b>
                  </p>
                </div>
                <div className="add-cart">
                  <button>
                    <i className="fa-solid fa-cart-shopping"></i>
                  </button>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
