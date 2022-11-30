import React from 'react';
import { Offcanvas } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCartThunk} from "../store/slices/cart.slice";
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
      Some text as placeholder. In real life you can have the elements you
      have chosen. Like, text, images, lists, etc.
    </Offcanvas.Body>
  </Offcanvas>
  );
};

export default PurchaseSidebars;