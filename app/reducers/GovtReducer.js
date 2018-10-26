import Cookies from 'js-cookie';
import * as types from '../actionTypes/GovtActionTypes';

const CookieUser = Cookies.get('signUpDetails');
let prePopulateEmail = '';
if (CookieUser) {
    const signInUserInfo = JSON.parse(CookieUser);
    prePopulateEmail = signInUserInfo.emailId;
}
const govtDetails = {
    name: '',
    email: prePopulateEmail,
    categories: '',
    nameOfBusiness: '',
    isNonProfitOrg: false,
};

export default function(state = {}, action) {
    let newState = {};
    switch (action.type) {
        case types.GET_CATEGORYS_REQUEST:
            newState = Object.assign({}, state);
            newState.payload = action.payload;

        return newState;

        case types.GET_CATEGORYS_SUCCESS:
            newState = Object.assign({}, state);
            const data = action.data;
            newState.categorys = data;

        return newState;

        case types.GET_CATEGORYS_ERROR:
            newState = Object.assign({}, state);
            newState.error = action.error;

        return newState;

        default:
            return state;
    }
}
