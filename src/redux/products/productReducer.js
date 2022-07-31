const ADD_TO_CART = 'addToCart';
const INCREMENT = 'increment';
const DECREMENT = 'decrement';

const initialState = {
    purchasedProducts: [],
    totalProducts: 0,
    productsTotalCost: 0
}

const incrementor = (arr, action) => {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i].id === action.product.id) {
            arr[i].count += 1;
            return true;
        }
    }
    return false;
}

const getTotalCost = (products, state, action) => {
    let total = 0;

    products.forEach(product => {
            product.prices.forEach(price => {
                if(action.product.currentCurrency === price.currency.label) {
                    total += (product.count * price.amount);
                }
            })
    })
    state.productsTotalCost = total;

    return state.productsTotalCost;
}

const productsReducer = (state = initialState, action) => {
    let products = JSON.parse(JSON.stringify(state.purchasedProducts));

    switch(action.type) {
        case ADD_TO_CART:
            let isOnTheList = false;
            isOnTheList = incrementor(products, action);

            if(!isOnTheList) {
                products = state.purchasedProducts.concat(action.product);
            }

            return {
                ...state,
                purchasedProducts: products,
                totalProducts: state.totalProducts + 1,
                productsTotalCost: getTotalCost(products, state, action)
            }
        case INCREMENT:
            incrementor(products, action);

            return {
                ...state,
                purchasedProducts: products,
                totalProducts: state.totalProducts + 1,
                productsTotalCost: getTotalCost(products, state, action)
            }
        case DECREMENT:
            for(let i = 0; i < products.length; i++) {
                const product = products[i];
                if(product.id === action.product.id) {
                    product.count -= 1;
                    break;
                }
            }

            return {
                ...state,
                purchasedProducts: products,
                totalProducts: state.totalProducts - 1,
                productsTotalCost: getTotalCost(products, state, action)
            }
        default: 
            return state;
    }
}

export { productsReducer, ADD_TO_CART, INCREMENT, DECREMENT };
