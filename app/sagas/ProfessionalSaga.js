import { takeLatest, put, call, all } from 'redux-saga/effects';
import _isEmpty from 'lodash/isEmpty';
import { getCategroysInBusiness, createCompanyInformation,
    getCustomerDataById, createCardDetailsInfo,
    createShoppingPreferenceInformation, uploadFileCompanyInformation } from '../api/ProfessionalApi';
import * as ProfessionalActionTypes from '../actionTypes/ProfessionalActionTypes';
import * as ProfessionalAction from '../actions/ProfessionalAction';
import history from '../history';

function* getBussinessCategorys(action) {
    try {
        const categorysResponse = yield call(getCategroysInBusiness, action);
        let { data } = categorysResponse;
    if (data && !_isEmpty(data)) {
        data = data.map(Obj => {
            Obj.value = Obj.categoryName;
            Obj.text = Obj.categoryName;

            return Obj;
        });
    }
    // const { payload: { stage } } = action;
        yield all([
            // put(ProfessionalAction.incrementStage(stage)),
            put({ type: ProfessionalActionTypes.GET_BUSINESS_CATEGORYS_SUCCESS, data })
        ]);
    } catch (error) {
        yield all([
            put({ type: ProfessionalActionTypes.GET_BUSINESS_CATEGORYS_ERROR, error }),
        ]);
    }
}

function* uploadFileCompanyInfo(action) {
    try {
        const { companyInfo: { uploadFile } } = action.payload;
        const uploadFileCompanyInfoResponse = yield call(uploadFileCompanyInformation, uploadFile);
        const { data } = uploadFileCompanyInfoResponse;
        if (data.error) {
            const { message } = data;
            yield put({ type: ProfessionalActionTypes.UPLOAD_FILE_COMPANY_INFO_ERROR, error: message });
        } else {
            const { payload: { companyInfo } } = action;
                const constuctFileObject = companyInfo;
                const documentProof = {
                    documentProofId: data.id,
                };
            constuctFileObject.documentProof.push(documentProof);
            action.payload.companyInfo = constuctFileObject;
            const payload = action.payload;
            yield all([
             put({ type: ProfessionalActionTypes.CREATE_COMPANY_INFO_REQUEST, payload }),
             put({ type: ProfessionalActionTypes.UPLOAD_FILE_COMPANY_INFO_SUCCESS, data })
            ]);
        }
    } catch (error) {
        yield all([
            put({ type: ProfessionalActionTypes.UPLOAD_FILE_COMPANY_INFO_ERROR, error }),
        ]);
    }
}

function* createCompanyInfo(action) {
    try {
        const createCompanyResponse = yield call(createCompanyInformation, action);
        const { data } = createCompanyResponse;
        if (data.error) {
            const { message } = data;
            yield put({ type: ProfessionalActionTypes.CREATE_COMPANY_INFO_ERROR, error: message });
        } else {
            const { payload: { signupStage } } = action;
            yield all([
             put(ProfessionalAction.incrementStage(signupStage - 1)),
             put({ type: ProfessionalActionTypes.CREATE_COMPANY_INFO_SUCCESS, data })
            ]);
        }
    } catch (error) {
        yield all([
            put({ type: ProfessionalActionTypes.CREATE_COMPANY_INFO_ERROR, error }),
        ]);
    }
}

function* createCardDetialsInfo(action) {
    try {
        const createCardResponse = yield call(createCardDetailsInfo, action);
        const { data } = createCardResponse;
        if (data.error) {
            const { message } = data;
            yield put({ type: ProfessionalActionTypes.CREATE_CARD_DETAILS_ERROR, error: message });
        } else {
            const { payload: { signupStage } } = action;
            yield all([
             put(ProfessionalAction.incrementStage(signupStage - 1)),
             put({ type: ProfessionalActionTypes.CREATE_CARD_DETAILS_SUCCESS, data })
            ]);
        }
    } catch (error) {
        yield all([
            put({ type: ProfessionalActionTypes.CREATE_CARD_DETAILS_ERROR, error }),
        ]);
    }
}

function* createShoppingPreferenceInfo(action) {
    try {
        const createShoppingPreferenceResponse = yield call(createShoppingPreferenceInformation, action);
        const { data } = createShoppingPreferenceResponse;
        if (data.error) {
            const { message } = data;
            yield put({ type: ProfessionalActionTypes.CREATE_SHOPPING_PREFERENCES_ERROR, error: message });
        } else {
            history.push('./oprofessionalHome');
            yield put({ type: ProfessionalActionTypes.CREATE_SHOPPING_PREFERENCES_SUCCESS, data });
        }
    } catch (error) {
        yield all([
            put({ type: ProfessionalActionTypes.CREATE_SHOPPING_PREFERENCES_ERROR, error }),
        ]);
    }
}

function* getSignUpCustomerById(action) {
    try {
        const customerData = yield call(getCustomerDataById, action);
        const { data } = customerData;
        if (data.error) {
            const { message } = data;
            yield put({ type: ProfessionalActionTypes.GET_SIGNUP_CUSTOMER_BY_ID_ERROR, error: message });
        } else {
            yield put({ type: ProfessionalActionTypes.GET_SIGNUP_CUSTOMER_BY_ID_SUCCESS, data });
        }
    } catch (error) {
        yield all([
            put({ type: ProfessionalActionTypes.GET_SIGNUP_CUSTOMER_BY_ID_ERROR, error }),
        ]);
    }
}

export default function* watchProfessionalSaga() {
    yield all([
        takeLatest(ProfessionalActionTypes.GET_BUSINESS_CATEGORYS_REQUEST, getBussinessCategorys),
        takeLatest(ProfessionalActionTypes.CREATE_COMPANY_INFO_REQUEST, createCompanyInfo),
        takeLatest(ProfessionalActionTypes.UPLOAD_FILE_COMPANY_INFO_REQUEST, uploadFileCompanyInfo),
        takeLatest(ProfessionalActionTypes.CREATE_CARD_DETAILS_REQUEST, createCardDetialsInfo),
        takeLatest(ProfessionalActionTypes.CREATE_SHOPPING_PREFERENCES_REQUEST, createShoppingPreferenceInfo),
        takeLatest(ProfessionalActionTypes.GET_SIGNUP_CUSTOMER_BY_ID_REQUEST, getSignUpCustomerById),
    ]);
}
