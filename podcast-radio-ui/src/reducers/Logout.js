const initialState = {
    shouldLogOut: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case 'SHOULD_LOGOUT':
            return {
                ...state,
                shouldLogOut: action.shouldLogOut
            }
        default: 
            return state;
    }
}