import { expect } from 'chai';
import GroupManagementReducer from './GroupManagementReducer';
import * as types from '../actionTypes/GroupManagementActionTypes';

describe('GroupManagementReducer', () => {
    const payload = {};
    // const error = 'User already exits';
    it('Should be called CURRENT_MEMBERS_LIST', () => {
        expect(
            GroupManagementReducer(undefined, {
                type: types.CURRENT_MEMBERS_LIST,
                payload,
            }),
        ).to.deep.equal({ payload });
    });

    it('Should be called DELETE_GROUP', () => {
        expect(
            GroupManagementReducer([], {
                type: types.DELETE_GROUP,
                payload,
            }),
        ).to.deep.equal({ payload });
    });

    it('Should be called NEW_GROUPS_ID', () => {
        expect(
            GroupManagementReducer(undefined, {
                type: types.NEW_GROUPS_ID,
                payload: undefined,
            }),
        ).to.deep.equal({ undefined });
    });

    it('initialstate', () => {
        expect(
            GroupManagementReducer(undefined, {}),
        ).to.deep.equal({});
    });
});
