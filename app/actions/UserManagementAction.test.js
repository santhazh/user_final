import { expect } from 'chai';
import * as UserManagementActionTypes from '../actionTypes/UserManagementActionTypes';
import * as actions from './UserManagementAction';

describe('UserManagement Actions', () => {
    describe('UserManagement Action Form', () => {
        let userManagementAction = null;
        it('returns correct action type get note', () => {
            userManagementAction = actions.userManagementRequest();
            expect(userManagementAction.type).to.equal(UserManagementActionTypes.GET_BUSINESS_CATEGORYS_REQUEST);
        });
    });
});
