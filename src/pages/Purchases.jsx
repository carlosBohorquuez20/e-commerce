import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPurchasesThunk } from "../store/slices/purchases.slice";
import { useSelector } from "react-redux";
import "../styles/purchases.css";

const Purchases = () => {
  const dispatch = useDispatch();

  const purchases = useSelector((state) => state.purchases);

  useEffect(() => {
    dispatch(getPurchasesThunk());
  }, []);
 console.log(purchases)
  return (
    <div className="purchases-main">
      <div className="purchase-container">
        <div className="text-purchases-top">
          <p>Home</p>
          <li>purchases</li>
        </div>
        <h4>My purchases</h4>
        {
          purchases?.map(purchase => (
            <div key={purchase.id} className="purchase-item">
            <div className="order-text">
              <p>order number:{purchase.cart.products.productsInCart?.productId}</p>
              <p>Order date: </p>
            </div>
            {
              purchase.cart.products.map(product => (
                <div className="product-purchase">
                  <div><img src="" alt="" /></div>
                  <div className="title-product">
                  <p>{product.title}</p>
                  </div>
                  <div className="quanty">{product.productsInCart.quantity}</div>
                  <div className="price-box"><p><b>${product.price}</b></p></div>
              </div>
              ))
            }
       
          </div>
          ))
        }

      </div>
    </div>
  );
};

export default Purchases;
