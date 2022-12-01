import React from "react";
import { useEffect } from "react";
import { getProductsThunk } from "../store/slices/product.slice";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import "../styles/productDetails.css";
import { createPurchasesThunk } from "../store/slices/cart.slice";
import Footer from "../components/Footer";

const ProudctDetails = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);

  const producList = useSelector((state) => state.product);

  const product = producList.find(
    (productItem) => productItem.id === Number(id)
  );

  const categoryProduct = producList.filter(
    (prodcutsItems) => prodcutsItems.category.id === product?.category.id
  );

  console.log(product);

  const [quantity, setQuantity] = useState("1");

  const addToPurchases = () => {
    const productCart = {
      id: product.id,
      quantity: quantity,
    };
    dispatch(createPurchasesThunk(productCart));
  };

  return (
    <div className="prduct-details-container">
      <div className="back">
        <Link to={"/"}>
          <p>
            <i className="fa-solid fa-chevron-left"></i> Back
          </p>
        </Link>
      </div>
      <div className="details-container">
        <div className="product-details-center">
          <div className="images-deatils">
            <div className="all-image-product">
              {product?.productImgs?.map((imgProduct) => (
                <div key={imgProduct} className="all-image-left">
                  <img src={imgProduct} alt="product image" />
                </div>
              ))}
            </div>
            <div className="img-select">
              <img src={product?.productImgs[0]} alt="product image" />
            </div>
          </div>
          <div className="product-description">
            <h2>{product?.title}</h2>
            <div className="stars">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star-half-stroke"></i>
              <p>4.5 / 5</p>
            </div>
            <p>{product?.description}</p>
            <div className="product-price">
              <div>
                <p>Price</p>
                <p>
                  <b>${product?.price}</b>
                </p>
              </div>
              <div className="quantity">
                <p>Quantity</p>
                <div className="quantity-container">
                  <button>-</button>
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <button>+</button>
                </div>
              </div>
            </div>
            <button onClick={addToPurchases} className="button-add-cart">
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <div className="other-products">
        <div className="line-separate"></div>
        <h3>Discover similar items</h3>
        <ul className="list-product-other">
          {categoryProduct.map((category) => (
            <li key={category.id}>
              <Link to={`/product/${category.id}`}>
                <div className="img-category-product">
                  <img src={category?.productImgs[0]} alt="product image" />
                </div>
                <div className="line-card-category"></div>
                <p>{category.title}</p>
                <div className="price-category">
                  <div>
                    <p>
                      Price <br />
                      <b>${category.price}</b>
                    </p>
                  </div>
                  <div className="add-cart-category">
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

export default ProudctDetails;
