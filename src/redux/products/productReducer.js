const ADD_TO_CART = 'addToCart';
const INCREMENT = 'increment';
const DECREMENT = 'decrement';

const initialState = {
    purchasedProducts: [],
    totalProducts: 0
}

const arrayCompare = (arr1, arr2) => {
    return arr1.join() === arr2.join();
}

const objectCompare = (obj1, obj2) => {
    if(arrayCompare(Object.keys(obj1), Object.keys(obj2))) {
        if(arrayCompare(Object.values(obj1), Object.values(obj2))) {
            return true;
        }
    }
    return false;
}

const incrementor = (arr, action) => {
    const currentProductAttributes = action.product.selectedAttributes;

    for(let i = 0; i < arr.length; i++) {
        const product = arr[i]
        if(product.name === action.product.name) {
            if(objectCompare(currentProductAttributes, product.selectedAttributes)) {
                product.count += 1;
                return true;
            }
        }
    }
    return false;
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
                totalProducts: state.totalProducts + 1
            }
        case INCREMENT:
            incrementor(products, action);

            return {
                ...state,
                purchasedProducts: products,
                totalProducts: state.totalProducts + 1
            }
        case DECREMENT:
            const currentProductAttributes= action.product.selectedAttributes;

            for(let i = 0; i < products.length; i++) {
                const product = products[i];

                if(product.id === action.product.id) {
                    if(objectCompare(currentProductAttributes, product.selectedAttributes)) {
                        if(product.count > 0) {
                            product.count -= 1;
                        }
                        if(product.count === 0) {
                           products = products.filter((item) => item.count > 0);
                        }
                    }
                }
            }

            return {
                ...state,
                purchasedProducts: products,
                totalProducts: state.totalProducts - 1
            }
        default: 
            return state;
    }
}

export { productsReducer, ADD_TO_CART, INCREMENT, DECREMENT };
