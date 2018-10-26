import { expect } from 'chai';
import UserManagementReducer from './UserManagementReducer';
import * as types from '../actionTypes/UserManagementActionTypes';

describe('GovtReducer', () => {
    const payload = {};
    it('Should be called USER_MANAGEMENT_REQUEST', () => {
        expect(
            UserManagementReducer(undefined, {
                type: types.USER_MANAGEMENT_REQUEST,
                payload,
            }),
        ).to.deep.equal({ payload });
    });

    it('Should be called USER_MANAGEMENT_SUCCESS', () => {
        expect(
            UserManagementReducer([], {
                type: types.USER_MANAGEMENT_SUCCESS,
                payload,
            }),
        ).to.deep.equal({ payload });
    });

    it('Should be called USER_MANAGEMENT_ERROR', () => {
        expect(
            UserManagementReducer(undefined, {
                type: types.USER_MANAGEMENT_ERROR,
                payload: undefined,
            }),
        ).to.deep.equal({ undefined });
    });

    it('initialstate', () => {
        expect(
            UserManagementReducer(undefined, {}),
        ).to.deep.equal({});
    });
});
