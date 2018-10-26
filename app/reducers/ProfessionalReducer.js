import _map from 'lodash/map';
import _uniq from 'lodash/uniq';
import _isEmpty from 'lodash/isEmpty';
import * as types from '../actionTypes/ProfessionalActionTypes';

const companyInfoDetails = {
    isNonProfitOrg: false,
    isReseller: false,
    name: '',
    email: '',
    ein: '',
};

const contractCompanyInfo = data => {
    const { companyInfo = {} } = data;
    companyInfo.nameOfBusiness = companyInfo.name || '';
    companyInfo.fullName = data.fullName || '';
    companyInfo.email = data.emailId || '';
    const categorys = [];
    _map(companyInfo.categories, obj => {
        categorys.push(obj.categoryName);
    });
    companyInfo.categorys = _uniq(categorys);

    return companyInfo;
};

export default function(state = {}, action) {
    let newState = {};
    switch (action.type) {
        case types.GET_BUSINESS_CATEGORYS_REQUEST:
            newState = Object.assign({}, state);
            newState.payload = action.payload;

        return newState;

        case types.GET_BUSINESS_CATEGORYS_SUCCESS:
            newState = Object.assign({}, state);
            newState.categorys = action.data;

        return newState;

        case types.GET_BUSINESS_CATEGORYS_ERROR:
            newState = Object.assign({}, state);
            newState.error = action.error;

        return newState;

        case types.GET_SIGNUP_CUSTOMER_BY_ID_REQUEST:
            newState = Object.assign({}, state);
            newState.payload = action.payload;

        return newState;

        case types.GET_SIGNUP_CUSTOMER_BY_ID_SUCCESS:
            newState = Object.assign({}, state);
            const data = action.data;
            // console.log('action.dataCUStom', data);
            companyInfoDetails.email = data.emailId || '';
            newState.companyInfoInitValues = !_isEmpty(data.companyInfo) ? contractCompanyInfo(data) : companyInfoDetails;

        return newState;

        case types.GET_SIGNUP_CUSTOMER_BY_ID_ERROR:
            newState = Object.assign({}, state);
            newState.error = action.error;

        return newState;

        case types.CREATE_COMPANY_INFO_REQUEST:
            newState = Object.assign({}, state);
            newState.payload = action.payload;

        return newState;

        case types.CREATE_COMPANY_INFO_SUCCESS:
        newState = Object.assign({}, state);
        newState.companyInfoSuccess = action.data;

        return newState;

        case types.CREATE_COMPANY_INFO_ERROR:
        newState = Object.assign({}, state);
        newState.error = action.error;

        return newState;

        case types.UPLOAD_FILE_COMPANY_INFO_REQUEST:
            newState = Object.assign({}, state);
            newState.payload = action.payload;

        return newState;

        case types.UPLOAD_FILE_COMPANY_INFO_SUCCESS:
        newState = Object.assign({}, state);
        newState.uploadFileCompanyInfoSuccess = action.data;

        return newState;

        case types.UPLOAD_FILE_COMPANY_INFO_ERROR:
        newState = Object.assign({}, state);
        newState.error = action.error;

        return newState;

    case types.INCREMENT_STAGE:
        newState = Object.assign({}, state);
        newState.stageIndex = action.payload + 1;

    return newState;

    case types.DECREMENT_STAGE:
        newState = Object.assign({}, state);
        newState.stageIndex = action.payload - 1;

    return newState;

    case types.CURRENT_STAGE:
        newState = Object.assign({}, state);
        newState.stageIndex = action.payload;

    return newState;

    case types.CREATE_CARD_DETAILS_REQUEST:
            newState = Object.assign({}, state);
            newState.payload = action.payload;

        return newState;

        case types.CREATE_CARD_DETAILS_SUCCESS:
        newState = Object.assign({}, state);
        newState.cardDetialSuccess = action.data;

    return newState;

        case types.CREATE_CARD_DETAILS_ERROR:
        newState = Object.assign({}, state);
        newState.error = action.error;

    return newState;

    case types.CREATE_SHOPPING_PREFERENCES_REQUEST:
            newState = Object.assign({}, state);
            newState.payload = action.payload;

        return newState;

        case types.CREATE_SHOPPING_PREFERENCES_SUCCESS:
        newState = Object.assign({}, state);
        newState.shoppingPreferenceSuccess = action.data;

    return newState;

        case types.CREATE_SHOPPING_PREFERENCES_ERROR:
        newState = Object.assign({}, state);
        newState.error = action.error;

    return newState;

        default:
            return state;
    }
}
