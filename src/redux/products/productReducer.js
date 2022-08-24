import { SET_PRODUCT } from "../actions-creator";
import { objectCompare } from "../../utils/utils";

const ADD_TO_CART = "addToCart";
const INCREMENT = "increment";
const DECREMENT = "decrement";

const initialState = {
  type: SET_PRODUCT,
  purchasedProducts: [],
  totalProducts: 0,
};

const incrementor = (arr, action) => {
  const currentProductAttributes = action.payload.product.selectedAttributes;

  for (let i = 0; i < arr.length; i++) {
    const product = arr[i];
    if (product.name === action.payload.product.name) {
      if (objectCompare(currentProductAttributes, product.selectedAttributes)) {
        product.count += 1;
        return true;
      }
    }
  }
  return false;
};

const productsReducer = (state = initialState, action) => {
  let products = JSON.parse(JSON.stringify(state.purchasedProducts));

  switch (action.type) {
    case SET_PRODUCT:
      switch (action.payload.action) {
        case ADD_TO_CART:
          let isOnTheList = incrementor(products, action);

          if (!isOnTheList) {
            products = state.purchasedProducts.concat(action.payload.product);
          }

          return {
            ...state,
            purchasedProducts: products,
            totalProducts: state.totalProducts + 1,
          };
        case INCREMENT:
          incrementor(products, action);

          return {
            ...state,
            purchasedProducts: products,
            totalProducts: state.totalProducts + 1,
          };
        case DECREMENT:
          const currentProductAttributes =
            action.payload.product.selectedAttributes;

          for (let i = 0; i < products.length; i++) {
            const product = products[i];

            if (product.id === action.payload.product.id) {
              if (
                objectCompare(
                  currentProductAttributes,
                  product.selectedAttributes
                )
              ) {
                if (product.count > 0) {
                  product.count -= 1;
                }
                if (product.count === 0) {
                  products = products.filter((item) => item.count > 0);
                }
              }
            }
          }

          return {
            ...state,
            purchasedProducts: products,
            totalProducts: state.totalProducts - 1,
          };
        default:
          return state;
      }
    default:
      return state;
  }
};

export { productsReducer, ADD_TO_CART, INCREMENT, DECREMENT };
