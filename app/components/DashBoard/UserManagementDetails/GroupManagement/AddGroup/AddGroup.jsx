import React, { Component } from 'react';
import { Col, NavDropdown, MenuItem, Row } from 'react-bootstrap';
import './AddGroup.scss';
import PropTypes from 'prop-types';
import _filter from 'lodash/filter';
import AddGroupPopup from './AddGroupPopup';
import DeleteConfirmation from '../../../../Model/DeleteConfirmation';
import { DELETE_GROUP_CONFIRMATION } from '../../../../../common/Constants';

class AddNewGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditClicked: false,
            isDeleteGroupClicked: false,
            editName: false,
            currentMembers: {},
            totalGroups: [],
            deleteConfirmationDetails: {
                isGroupDeleted: false,
                filteredListIds: {}
            }
        };
        this.slectedGroupDetail = {};
        this.objGroupToDelete;
        this.clicked = props.isAddGroupClicked;
        this.deleteSuccessful = false;
        this.editSuccessful = false;
    }


    openDeleteGroupPopup = (index, obj) => {
        this.objGroupToDelete = obj;
        this.setState({ isDeleteGroupClicked: true });
    }

    editGroup = () => {
        this.setState({
            isEditClicked: true
        });
    }

    editGroupName = () => {
        this.setState({ editName: true });
    };


    updatedGroupName = (e, keyVal, groupIndex) => {
        const { totalGroups } = this.state;
        totalGroups[groupIndex].groupName = e.target.value;
    }

    onDeleteConfirmation = () => {
        const { totalGroups } = this.state;
        const filteredList = _filter(totalGroups, obj => {
            return obj.groupId !== this.objGroupToDelete.groupId;
        });
        this.setState({
            isDeleteGroupClicked: false,
            totalGroups: filteredList
        });
        this.deleteSuccessful = true;
    }

    saveAddPopup = getAddGroupDetails => {
        const { totalGroups } = this.state;
        const currentIndex = getAddGroupDetails.groupId - 1;
        totalGroups[currentIndex].currentMembersList = getAddGroupDetails.currentMembersList;
        totalGroups[currentIndex].usersDetails = getAddGroupDetails.usersDetails;
        this.setState({
            isEditClicked: false,
            totalGroups
        });
        getAddGroupDetails.isUpdate = false;
        this.editSuccessful = true;
    }

    closeAddPopup = () => {
        this.setState({
            isEditClicked: false,
        });
    }

    checkGroupDataDupes = (id, groupData) => {
        let isUnique = true;
        for (let i = 0; i < groupData.length; i++) {
            if (groupData[i].groupId === id) {
                isUnique = false;
            }
        }

        return isUnique;
    }

    openAddGroupPopup = (index, obj) => {
        this.slectedGroupDetail = {
            isGroupEdit: true,
            totalGroupsIndex: index,
            groupId: obj.groupId,
            groupName: obj.groupName,
            currentMembersList: obj.currentMembersList,
            usersDetails: obj.usersDetails
        };
        this.setState({ isEditClicked: true });
    }

    render() {
        const { isNewGroup, setNewGroupfalse } = this.props;
        const { isEditClicked, totalGroups, isDeleteGroupClicked, editName, deleteConfirmationDetails, newName, currentMembers } = this.state;
        if (isNewGroup && !this.deleteSuccessful && !this.editSuccessful) {
            const grpObj = {
                groupId: totalGroups.length + 1,
                groupName: 'Enter Your Name',
                currentMembersList: [],
                usersDetails: []
            };
            const isUniqueGroupObj = this.checkGroupDataDupes(grpObj.groupId, totalGroups);
            if (isUniqueGroupObj) {
                totalGroups.push(grpObj);
            }
            setNewGroupfalse();
        }
        this.newGroupName = '';
        this.deleteSuccessful = false;
        this.editSuccessful = false;

        return (
            <div>
                { totalGroups && totalGroups.map((key, index) => {
                        this.newGroupName = totalGroups[index].groupName;

                        return (
                            <div id="gm-newGroup" onClick={() => { this.editGroupName; }}>
                                <Col key={index} xs={4} className="newGroupStyle">
                                    <div>
                                        <Row>
                                            <Col md={10}>
                                                <input type="text" className={editName ? 'gm-edit-name newGroupLabel' : 'newGroupLabel'} onBlur={e => { this.updatedGroupName(e, key, index); }} placeholder={totalGroups[index].groupName} />
                                            </Col>
                                            <Col md={2}>
                                                <NavDropdown
                                                    pullRight
                                                    id="gm-dropdownOptions"
                                                    eventKey={1}
                                                    title={(
                                                        <div style={{ display: 'inline-block' }}>
                                                            <span className="newGroupOption" />
                                                        </div>
                                                    )}>
                                                    <MenuItem active eventKey={1.1} onClick={() => { this.openAddGroupPopup(index, key); }}>Edit members</MenuItem>
                                                    <MenuItem eventKey={1.2} onClick={() => { this.openDeleteGroupPopup(index, key); }}>Delete group</MenuItem>
                                                </NavDropdown>
                                            </Col>
                                        </Row>
                                        <div>
                                            {`${totalGroups[index].currentMembersList ? totalGroups[index].currentMembersList.length : 0} members`}
                                        </div>
                                        <i onClick={() => { this.openAddGroupPopup(index, key); }} className="fa fa-plus fa-2x" aria-hidden="true" />
                                        <div>
                                            { totalGroups[index].currentMembersList && totalGroups[index].currentMembersList.map(index => {
                                                return (
                                                    <span id={index} className="profile-container">
                                                        <span className="profile-pic-container">
                                                            <span className="profile-name-container">JD</span>
                                                        </span>
                                                    </span>
                                                );
                                            })
                                            }
                                        </div>
                                    </div>
                                </Col>
                            </div>
                        );
                    })
                }
                {isDeleteGroupClicked && (
                    <DeleteConfirmation
                        onHide={() => { this.setState({ isDeleteGroupClicked: false }); }}
                        show={isDeleteGroupClicked}
                        onConfirmation={() => {
                        this.onDeleteConfirmation();
                        }}
                        bodycontent={DELETE_GROUP_CONFIRMATION}
                        buttons={{ cancel: 'Cancel', confirm: 'Confirm & Proceed' }}/>
                )}
                {isEditClicked && <AddGroupPopup show={isEditClicked} groupDetail={this.slectedGroupDetail} onHide={this.closeAddPopup} onUpdate={this.saveAddPopup}/>}
            </div>
        );
    }
}

AddNewGroup.propTypes = {
    isNewGroup: PropTypes.bool,
    isAddGroupClicked: PropTypes.bool,
    setNewGroupfalse: PropTypes.func,
};

export default AddNewGroup;
