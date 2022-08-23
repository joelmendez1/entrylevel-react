import { TOOGLE_BACKGROUND } from "../actions-creator"

const initialState = {
    type: TOOGLE_BACKGROUND,
    currentBackground: "#FFFFFF"
}

const backgroundReducer = (state = initialState, action) => {
    switch(action.type) {
        case TOOGLE_BACKGROUND:
            switch(action.payload) {
                case false:
                    return {
                        ...state,
                        currentBackground: "#FFFFFF"
                    }
                case true:
                    return {
                        ...state,
                        currentBackground: "rgba(57, 55, 72, 0.22)"
                    }
                default:
                    return state
            }
        default: return state
        }
}

export { backgroundReducer }