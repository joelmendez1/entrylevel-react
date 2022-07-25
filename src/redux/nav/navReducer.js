const initialState = {
    currentURL: 'home'
}

const navReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'home': 
            return {
                ...state,
                currentURL: 'home'
            }
        case 'clothes': 
            return {
                ...state,
                currentURL: 'clothes'
            }
        case 'tech': 
            return {
                ...state,
                currentURL: 'tech'
            }
        default: return state
    }
}

export { navReducer }