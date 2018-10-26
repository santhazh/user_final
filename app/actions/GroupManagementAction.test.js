import { expect } from 'chai';
import * as GroupManagementActionTypes from '../actionTypes/GroupManagementActionTypes';
import * as actions from './GroupManagementAction';

describe('GroupManagement Actions', () => {
    describe('GroupManagement Action Form', () => {
        let groupManagementAction = null;
        it('returns correct action type get note', () => {
            groupManagementAction = actions.currentMembersList();
            expect(groupManagementAction.type).to.equal(GroupManagementActionTypes.currentMembersList);
        });
        it('returns correct action type get note', () => {
            groupManagementAction = actions.newGroupsId();
            expect(groupManagementAction.type).to.equal(GroupManagementActionTypes.NEW_GROUPS_ID);
        });
        it('returns correct action type get note', () => {
            groupManagementAction = actions.deleteGroup();
            expect(groupManagementAction.type).to.equal(GroupManagementActionTypes.DELETE_GROUP);
        });
    });
});
