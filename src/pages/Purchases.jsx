import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPurchasesThunk } from "../store/slices/purchases.slice";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "../styles/purchases.css";
import PurchaseDate from "../components/PurchaseDate";

import laptop from "../img/laptop.png";
import Footer from "../components/Footer";
const Purchases = ({modalNav, setModalNav}) => {
  const dispatch = useDispatch();

  const purchases = useSelector((state) => state.purchases);

  useEffect(() => {
    dispatch(getPurchasesThunk());
  }, []);

  const modalActive = () => {
    setModalNav(true);
    
  }

  //console.log(purchases);
  return (
    <div className="purchases-main">
      <div className="back-purchases">
        <Link to={"/"}>
          <p>
            <i className="fa-solid fa-chevron-left"></i> Back
          </p>
        </Link>
        <i onClick={modalActive} class="fa-solid fa-bars menu-mobile black-menu"></i>
      </div>
      <div className="purchase-container">
        <h4>My Purchases</h4>
        {purchases.map((purchase) => (
          <div key={purchase.id} className="purchase-item">
            <PurchaseDate purchase={purchase} />
            {purchase.cart.products?.map((product) => (
              <div key={product.id} className="product-purchase">
                <div className="img-purchase">
                  <img src={laptop} alt="product" />
                </div>
                <div className="purchase-details">
                  <div className="title-product">
                    <p>{product.title}</p>
                  </div>
                  <div className="stars-purchase">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star-half-stroke"></i>
                    <p>4.5 / 5</p>
                  </div>
                  <div className="quanty-price">
                    <div className="price-box">
                      <p>
                        <b>${product.price}</b>
                      </p>
                    </div>
                    <div className="quanty">
                      {product.productsInCart.quantity}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Purchases;
