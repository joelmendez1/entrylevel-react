const initialState = {
    purchasedProducts: []
}

const productsReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'add': 
            const addProduct = state.purchasedProducts.concat(action.product);
            return {
                ...state,
                purchasedProducts: addProduct
            }
        case 'remove':        
            const totalProducts = state.purchasedProducts
            let items = [...totalProducts];
            
            totalProducts.forEach(product => {
                if(product.name === action.product.name) {
                    const item = totalProducts.indexOf(product)
                    items = [
                        ...totalProducts.slice(0, item),
                        ...totalProducts.slice(item + 1)
                    ]
                }
            })

            return {
                ...state,
                purchasedProducts: items
            }  
        default: 
            return state
    }
}

export { productsReducer }
