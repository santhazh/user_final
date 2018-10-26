import * as types from '../actionTypes/MyProfileActionTypes';

export default function(state = {}, action) {
    let newState = {};
    switch (action.type) {
        case types.GET_PROFILE_REQUEST:
            newState = Object.assign({}, state);
            newState.payload = action.payload;

        return newState;

        case types.GET_PROFILE_SUCCESS:
            newState = Object.assign({}, state);
            const data = action.data;
            newState.UserDetails = data;

        return newState;

        case types.GET_PROFILE_ERROR:
            newState = Object.assign({}, state);
            newState.error = action.error;

        return newState;

        default:
            return state;
    }
}
