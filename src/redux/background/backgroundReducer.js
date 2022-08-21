const initialState = {
    currentBackground: "#FFFFFF"
}

const backgroundReducer = (state = initialState, action) => {
    switch(action.type) {
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
}

export { backgroundReducer }