import React from "react";
import { useEffect } from "react";
import { getProductsThunk } from "../store/slices/product.slice";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import "../styles/productDetails.css";

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

  return (
    <div className="prduct-details-container">
      <div className="product-details-center">
        <div className="images-deatils">
          <div className="img-main">
            <div className="img-select">
              <img src={product?.productImgs[0]} alt="product image" />
            </div>
            <div className="all-image-product">
              {product?.productImgs?.map((imgProduct) => (
                <img src={imgProduct} alt="product image" />
              ))}
            </div>
          </div>
        </div>
        <div className="prodcut-description">
          <h2>{product?.title}</h2>
          <p>{product?.description}</p>
          <div className="prodcut-price">
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
                <input type="text" />
                <button>+</button>
              </div>
            </div>
          </div>
          <button className="button-add-cart">Add to cart</button>
        </div>
      </div>
      <div className="other-prodcuts">
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
    </div>
  );
};

export default ProudctDetails;
