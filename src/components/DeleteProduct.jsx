import React from "react";
import { useDispatch } from "react-redux";
import { deleteProductThunk } from "../store/slices/cart.slice";
const DeleteProduct = ({cartProduct}) => {
  const dispatch = useDispatch();

  return (
    <div>
      <i onClick={() => dispatch(deleteProductThunk(cartProduct.id))} className="fa-solid fa-trash-can"></i>
    </div>
  );
};

export default DeleteProduct;
