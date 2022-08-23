import { SET_CURRENCY } from "../actions-creator";

const initialState = {
    currentCurrency: {
        label: "USD",
        symbol: "$"
    }
}

const currencyReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_CURRENCY:
            return {
                ...state,
                currentCurrency: action.payload
            }
        default: return state
    }
}

export { currencyReducer }