import { SET_URL } from "../actions-creator";

const initialState = {
    type: SET_URL,
    currentURL: 'all'
}

const navReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_URL:
            return {
                ...state,
                currentURL: action.payload
            }
        default: return state
    }
}

export { navReducer }