const initialState = {
    currentCurrency: 'USD'
}

const currencyReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'USD': 
            return {
                ...state,
                currentCurrency: 'USD'
            }
        case 'GBP': 
            return {
                ...state,
                currentCurrency: 'GBP'
            }
        case 'AUD': 
            return {
                ...state,
                currentCurrency: 'AUD'
            }
        case 'JPY': 
            return {
                ...state,
                currentCurrency: 'JPY'
            }
        case 'RUB': 
            return {
                ...state,
                currentCurrency: 'RUB'
            }
        default: return state
    }
}

export { currencyReducer }