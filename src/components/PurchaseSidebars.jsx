import React from 'react';
import { Offcanvas } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkoutPurchasesThunk, getCartThunk} from "../store/slices/cart.slice";
import { useSelector } from "react-redux";
const PurchaseSidebars = ({show, handleClose}) => {

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartThunk());
  }, []);

  return (
    <Offcanvas show={show} onHide={handleClose}>
    <Offcanvas.Header closeButton>
      <Offcanvas.Title>Offcanvas</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
      {
        cart.map((cartProduct) => (
          <div key={cartProduct.id}>{cartProduct.title}</div>
        ))

      }
      <button onClick={() => dispatch(checkoutPurchasesThunk())}>CHECKOUT</button>
    </Offcanvas.Body>
  </Offcanvas>
  );
};

export default PurchaseSidebars;