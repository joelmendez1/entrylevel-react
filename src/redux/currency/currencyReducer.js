const initialState = {
    type: "setCurrency",
    currentCurrency: {
        label: "USD",
        symbol: "$"
    }
}

const currencyReducer = (state = initialState, action) => {
    switch(action.type) {
        case "setCurrency":
            return {
                ...state,
                currentCurrency: action.currency
            }
        default: return state
    }
}

export { currencyReducer }