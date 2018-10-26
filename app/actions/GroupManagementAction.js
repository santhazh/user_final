import * as GroupManagementActionTypes from '../actionTypes/GroupManagementActionTypes';

export const currentMembersList = list => ({
    type: GroupManagementActionTypes.CURRENT_MEMBERS_LIST,
    payload: list,
});

export const newGroupsId = key => ({
    type: GroupManagementActionTypes.NEW_GROUPS_ID,
    payload: key,
});

export const deleteGroup = obj => ({
    type: GroupManagementActionTypes.DELETE_GROUP,
    payload: obj,
});

export default {
    currentMembersList,
    newGroupsId,
    deleteGroup,
};
