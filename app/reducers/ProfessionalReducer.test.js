import { expect } from 'chai';
import ProfessionalReducer from './ProfessionalReducer';
import * as types from '../actionTypes/ProfessionalActionTypes';

describe('ProfessionalReducer', () => {
    const payload = {};
    it('Should be called GET_BUSINESS_CATEGORYS_REQUEST', () => {
        expect(
            ProfessionalReducer(undefined, {
                type: types.GET_BUSINESS_CATEGORYS_REQUEST,
                payload,
            }),
        ).to.deep.equal({ payload });
    });

    it('Should be called GET_BUSINESS_CATEGORYS_SUCCESS', () => {
        expect(
            ProfessionalReducer([], {
                type: types.GET_BUSINESS_CATEGORYS_SUCCESS,
                payload,
            }),
        ).to.deep.equal({ payload });
    });

    it('Should be called GET_BUSINESS_CATEGORYS_ERROR', () => {
        expect(
            ProfessionalReducer(undefined, {
                type: types.GET_BUSINESS_CATEGORYS_ERROR,
                payload: undefined,
            }),
        ).to.deep.equal({ undefined });
    });

    it('initialstate', () => {
        expect(
            ProfessionalReducer(undefined, {}),
        ).to.deep.equal({});
    });
});
