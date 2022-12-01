import React from "react";
import { Offcanvas } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  checkoutPurchasesThunk,
  getCartThunk, deleteProductThunk
} from "../store/slices/cart.slice";
import { useSelector } from "react-redux";
import "../styles/cart.css";
import DeleteProduct from "./DeleteProduct";
const PurchaseSidebars = ({ show, handleClose }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);



 
  useEffect(() => {
    dispatch(getCartThunk());
    
  }, []);

  let total = 0;

  cart?.forEach(element => {
      total += Number.parseInt(element.price)
  });


  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="cart-box">
          {cart.map((cartProduct) => (
            <div key={cartProduct.id} className="product-cart">
              <div className="brand">
                <p>{cartProduct.brand}</p>
                <DeleteProduct cartProduct={cartProduct}/>
              </div>
              <p>{cartProduct.title}</p>
              <div className="quantity-cart">
                {cartProduct?.productsInCart?.quantity}
              </div>
              <div className="price-cart-item">
                <p>
                  <span>Total </span>$ { Number.parseInt(cartProduct.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="button-cart">
          <div className="total-cart">
            <p>Total</p>
            <p>${total}</p>
          </div>
          <button onClick={() => dispatch(checkoutPurchasesThunk())}>
            CHECKOUT
          </button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default PurchaseSidebars;
