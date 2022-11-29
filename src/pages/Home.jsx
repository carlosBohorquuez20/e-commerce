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
      <div className="slide-Image">
        <Swiper
          rewind={true}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src={black1} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={controle} alt="" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="home-middle">
        <p>
          {" "}
          <b>These will get your attention</b>
        </p>
        <ul className="circle-category">
          {categoriesList.map((category) => (
            <li
              key={category.id}
              onClick={() => dispatch(filterProductsThunk(category.id))}
            >
              <img src={mobile} alt="mobile" />
              {category.name}
            </li>
          ))}
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
              <p>{product.title}</p>
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
  );
};

export default Home;
