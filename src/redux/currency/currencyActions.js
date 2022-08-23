const SET_CURRENCY = "setCurrency";

const setCurrency = (currency) => {
  return {
    type: SET_CURRENCY,
    payload: currency,
  };
};

export { setCurrency };
