const initialState = {
    purchasedProducts: []
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

const productsReducer = (state = initialState, action) => {
    let products = JSON.parse(JSON.stringify(state.purchasedProducts));

    switch(action.type) {
        case 'add': 
            let isOnTheList = false;
            isOnTheList = incrementor(products, action);

            if(!isOnTheList) {
                products = state.purchasedProducts.concat(action.product);
            }

            return {
                ...state,
                purchasedProducts: products
            }
        case 'increment':
            incrementor(products, action);

            return {
                ...state,
                purchasedProducts: products
            }
        case 'decrement':
            for(let i = 0; i < products.length; i++) {
                const product = products[i];
                if(product.id === action.product.id) {
                    product.count -= 1;
                    break;
                }
            }

            return {
                ...state,
                purchasedProducts: products
            }
        default: 
            return state;
    }
}

export { productsReducer }
