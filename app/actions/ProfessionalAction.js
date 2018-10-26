import * as ProfessionalActionTypes from '../actionTypes/ProfessionalActionTypes';

export const getBusinessCategorys = (values = {}) => ({
    type: ProfessionalActionTypes.GET_BUSINESS_CATEGORYS_REQUEST,
    payload: values,
});

// export const getProfessionalDefault = (values = {}) => ({
//     type: ProfessionalActionTypes.GET_PROFESSIONAL_DEFAULT,
//     payload: values,
// });

export const getSignupCustomerById = (values = null) => ({
    type: ProfessionalActionTypes.GET_SIGNUP_CUSTOMER_BY_ID_REQUEST,
    payload: values,
});


export const createCompanyInfo = (values = {}) => ({
    type: ProfessionalActionTypes.CREATE_COMPANY_INFO_REQUEST,
    payload: values,
});

export const uploadFileCompanyInfo = (values = {}) => ({
    type: ProfessionalActionTypes.UPLOAD_FILE_COMPANY_INFO_REQUEST,
    payload: values,
});

export const createCardDetails = (values = {}) => ({
    type: ProfessionalActionTypes.CREATE_CARD_DETAILS_REQUEST,
    payload: values,
});

export const createShoppingPreferences = (values = {}) => ({
    type: ProfessionalActionTypes.CREATE_SHOPPING_PREFERENCES_REQUEST,
    payload: values,
});

export const incrementStage = (index = 0) => ({
    type: ProfessionalActionTypes.INCREMENT_STAGE,
    payload: index,
});

export const decrementStage = (index = 1) => ({
    type: ProfessionalActionTypes.DECREMENT_STAGE,
    payload: index,
});

export default {
    getBusinessCategorys,
    // getProfessionalDefault,
    createCompanyInfo,
    uploadFileCompanyInfo
};
