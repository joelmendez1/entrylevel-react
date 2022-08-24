import { SET_PRODUCT, RESET_CART } from "../actions-creator";

const setProduct = (action, product) => {
  return {
    type: SET_PRODUCT,
    payload: {
      action,
      product,
    },
  };
};

const resetCart = () => {
  return {
    type: RESET_CART,
  };
};

export { setProduct, resetCart };
