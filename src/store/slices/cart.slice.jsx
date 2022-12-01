import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { setIsLoading } from "./isLoading.slice";

// Cambiamos productSlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    setCart: (state, action) => {
      return action.payload;
    },
  },
});



export const getCartThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  axios
    .get("https://e-commerce-api.academlo.tech/api/v1/cart", getConfig())
    .then((res) => dispatch(setCart(res.data.data.cart.products
      )))
    .finally(() => dispatch(setIsLoading(false)));
};

export const createPurchasesThunk = (productCart) => (dispatch) => {
  dispatch(setIsLoading(true));
  axios
    .post("https://e-commerce-api.academlo.tech/api/v1/cart",productCart, getConfig())
    .then(() => dispatch(getCartThunk()))
    .finally(() => dispatch(setIsLoading(false)));
};

export const checkoutPurchasesThunk = (productCart) => (dispatch) => {
  dispatch(setIsLoading(true));
  axios
    .post("https://e-commerce-api.academlo.tech/api/v1/purchases", {}, getConfig())
    .then(() => dispatch(setCart([])))
    .finally(() => dispatch(setIsLoading(false)));
};

export const deleteProductThunk = (id) => (dispatch) => {
  dispatch(setIsLoading(true))
  axios.delete(`https://e-commerce-api.academlo.tech/api/v1/cart/${id}`, getConfig())
      .then(() => dispatch(getCartThunk()))
      .finally(() => dispatch(setIsLoading(false)))
}


export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
