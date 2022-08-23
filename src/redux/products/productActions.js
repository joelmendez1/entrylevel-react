import { SET_PRODUCT } from "../actions-creator";

const setProduct = (action, product) => {
  return {
    type: SET_PRODUCT,
    payload: {
      action,
      product,
    },
  };
};

export { setProduct };
