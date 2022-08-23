import { TOOGLE_BACKGROUND } from "../actions-creator";

const setBackground = (background) => {
  return {
    type: TOOGLE_BACKGROUND,
    payload: background,
  };
};

export { setBackground };
