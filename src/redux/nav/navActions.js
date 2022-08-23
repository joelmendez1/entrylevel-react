import { SET_URL } from "../actions-creator";

const setURL = (url) => {
  return {
    type: SET_URL,
    payload: url,
  };
};

export { setURL };
