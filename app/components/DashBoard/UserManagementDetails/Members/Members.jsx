import React, { Component } from 'react';
import {
    Row, Col,
} from 'react-bootstrap';
import './Members.scss';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import _filter from 'lodash/filter';
import _uniq from 'lodash/uniq';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import DeleteUserPopUpDetails from '../../../Model/DeleteUserPopUpDetails';
import * as UserManagementAction from '../../../../actions/UserManagementAction';

export class Members extends Component {
    constructor(props) {
        super(props);
        this.props = {
            addUserDetails: {}
        };
        this.state = {
            deleteSingleUser: false,
            deleteMultipleUser: false,
            showDelete: false,
            membersArr: [],
            memberArrCount: 0,
            currentRow: {},
            userListAfterDelete: [],
            deletionConfirmed: false,
            memberArrayCount: 0,
            membersList: []
        };
        this.cellEditProp = {
            mode: 'click',
            blurToSave: true
        };
        this.selectRow = {
            mode: 'checkbox',
            onSelect: this.onTableRowSelect,
            onSelectAll: this.onTableSelectAll
        };
        this.columns = [{
            dataField: 'fullName',
            text: 'Name',
            sort: true,
            editable: false
          }, {
            dataField: 'email',
            text: 'Email',
            sort: true,
            editable: false
          }, {
            dataField: 'roleType',
            text: 'Role',
            sort: true,
            editable: true,
            classes: 'customEditCell',
            editor: {
                type: Type.SELECT,
                options: [{
                  value: 'Admin',
                  label: 'Admin'
                }, {
                  value: 'Contributor',
                  label: 'Contributor'
                }]
              }
          }, {
            dataField: 'groupName',
            text: 'Group',
            sort: true,
            editable: true,
            classes: 'customEditCell',
            editor: {
                type: Type.SELECT,
                options: [{
                  value: 'Maintenance',
                  label: 'Maintenance   '
                }, {
                  value: 'Tech Team',
                  label: 'Tech Team'
                }, {
                    value: 'Procurement',
                    label: 'Procurement'
                  }]
              }
          }, {
            dataField: 'action',
            text: 'Action',
            sort: true,
            editable: false,
            formatter: this.userManagementIconWrapFormatter,
          }];
    }

    componentWillMount() {
        // const { action } = this.props;
        // actions.userManagementRequest();

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.membersList.length > 0) {
            this.setState({
                membersList: nextProps.membersList
            });
        }
    }

    onSingleUserDelete = rowObj => {
        this.setState({
            deleteSingleUser: true,
            currentRow: rowObj
        });
    }

    onGroupDelete = () => {
        this.setState({
            deleteMultipleUser: true
        });
    }

    onTableRowSelect = (row, isSelected) => {
        const { membersArr } = this.state;
        let staticMemArr = membersArr;

        const index = parseInt((row.id) - 1);
        setTimeout(() => {
            if (isSelected) {
                staticMemArr.splice(index, 0, row);
            } else {
                const rowindex = this.checkExists(row);
                staticMemArr.splice(rowindex, 1);
            }
            if (staticMemArr.length > 0) {
                staticMemArr = _uniq(staticMemArr);
                this.setState({
                    membersArr: staticMemArr,
                    memberArrayCount: staticMemArr.length,
                    showDelete: true
                });
            } else {
                this.setState({
                    staticMemArr: [],
                    memberArrayCount: 0,
                    showDelete: false
                });
            }
        }, 50);
    }

    checkExists = row => {
        const { membersArr } = this.state;
        for (let i = 0; i < membersArr.length; i++) {
            if (membersArr[i].id === row.id) {
                return i;
            }
        }

        return false;
    }

    onTableSelectAll = (isSelect, rows) => {
        if (isSelect) {
            setTimeout(() => {
                this.setState({
                    membersArr: rows,
                    memberArrayCount: rows.length,
                    showDelete: true
                });
            }, 50);
        } else {
            setTimeout(() => {
                this.setState({
                    membersArr: [],
                    memberArrayCount: 0,
                    showDelete: false
                });
            }, 50);
        }
    }

    userManagementIconWrapFormatter = (cell, row) => {
        return (
            <div>
                <div className="UserManagementDeleteIcon" onClick={() => this.onSingleUserDelete(row)}>
                    <i className="fa fa-trash-o"/>
                </div>
            </div>
        );
    };

    singleDeleteConfirmation = usersList => {
        const { currentRow } = this.state;
        let filteredList = [];

        filteredList = _filter(usersList, obj => {
            return currentRow.id !== obj.id;
        });

        this.setState({
            userListAfterDelete: filteredList,
            deletionConfirmed: true
        });
    }

    multiDeleteConfirmation = usersList => {
        const { membersArr } = this.state;
        const { actions } = this.props;
        const submitValue = {};
        submitValue.email = ['test@overstock.com', 'test1@overstock.com'];
        actions.userManagementMultiDeleteUserRequest([submitValue]);
        let filteredList = [];
        filteredList = usersList.filter(obj => !membersArr.includes(obj));

        this.setState({
            userListAfterDelete: filteredList,
            deletionConfirmed: true,
            membersArr: []
        });
    }

    checkTableDataDupes = (id, tableData) => {
        let isUnique = true;
        for (let i = 0; i < tableData.length; i++) {
            if (tableData[i].id === id) {
                isUnique = false;
            }
        }

        return isUnique;
    }

    handleEditUser = newValue => {
        console.log('eloooo', newValue);
        const { actions } = this.props;
        actions.userManagementUpdateUserRequest(newValue);
    }

    render() {
        const { deleteSingleUser, showDelete, membersArr, currentRow, deleteMultipleUser, userListAfterDelete, deletionConfirmed } = this.state;
        // let { userTableData } = this.state;

        let { addUserDetails } = this.props;

        const { userDetailsData, membersList, updateUserSuccess } = this.props;
        const singleUserDeleteContent = {
            title: `Are you sure you want to remove ${currentRow.fullName}?`,
            content: 'You are removing this user from your company account. This user will no longer be a member of Oprofessional and will not have access to the exclusive deals and offers Oprofessional has to offer.'
        };
        const multiUserDeleteContent = {
            title: 'Are you sure you want to remove these users?',
            content: 'You are removing these users from your company account. These users will no longer be members of Oprofessional and will not have access to the exclusive deals and offers Oprofessional has to offer. '
        };

        console.log('updateUserSuccess', updateUserSuccess);
        // this.products = userTableData;
        if (addUserDetails.isNewUser && !(deleteSingleUser || deleteSingleUser)) {
            const newUser = {
                id: addUserDetails.userEmail,
                fullName: '',
                email: addUserDetails.userEmail,
                roleType: addUserDetails.userRole,
                groupName: addUserDetails.userGroup
            };


            const isUniqueArray = this.checkTableDataDupes(newUser.id, membersList);
            if (isUniqueArray) {
                membersList.push(newUser);
            }
            addUserDetails = {};
        }
        // this.products = userDetailsData;
        if (deletionConfirmed) {
            this.products = userListAfterDelete;
        }

        const newLocal = (
            <DeleteUserPopUpDetails
                show={deleteMultipleUser}
                resetpassword={1}
                onHide={() => { this.setState({ deleteMultipleUser: false, showDelete: false, membersArr: [] }); }}
                multipleUserDetails={membersArr}
                bodyContent={multiUserDeleteContent}
                onConfirm={() => { this.multiDeleteConfirmation(this.products); }} />
        );

        return (
            <div className="profileWrapBox">

                <Row>
                    <Col lg={12} md={12}>
                        <ul className="profileWrapList">
                            <li><i className="fa fa-user-circle" /></li>
                            <li>Jane Doe</li>
                            <li>janedoe@overstock.com</li>
                            <li>Admin</li>
                            <li>Maintenance</li>
                            <li><a href="/dashboard/accountabs" className="myProfileRedirect">My profile</a></li>
                        </ul>
                    </Col>
                </Row>

                <ToolkitProvider
                    keyField="id"
                    data={membersList}
                    columns={this.columns}
                    search>
                    {props => (
                        <div>
                            <hr />
                            <BootstrapTable
                                selectRow={this.selectRow}
                                dataFormat={this.userManagementIconWrapFormatter}
                                cellEdit={cellEditFactory({ mode: 'click',
                                 blurToSave: true,
                                 beforeSaveCell: (oldValue, newValue) => {
                                    // axios({
                                    //     method: 'put',
                                    //     url: '../../../../json/db.json',
                                    //     role: row.roleType.newValue,
                                    //     group: row.groupName.newValue,
                                    //     data: newValue,
                                    // })
                                    // .then(response => {
                                    //    console.log(response.data);
                                    // })
                                    // .catch(response => {
                                    //     console.log(response);
                                    // });
                                    this.handleEditUser(newValue);
                                },
                                //  afterSaveCell: (oldValue, newValue, row, column) => {}
                                })}
                                {...props.baseProps}
                            />
                        </div>)
                    }
                </ToolkitProvider>
                {showDelete && (
                    <Row>
                        <Col lg={12} sm={12}>
                            <div className="deleteContainer" onClick={this.onGroupDelete}>
                                <i className="fa fa-trash-o"/>
                                <p className="deleteButton" >{`Remove selected users (${membersArr.length})`}</p>
                            </div>
                        </Col>
                    </Row>)
                }

                { deleteSingleUser && (
                    <DeleteUserPopUpDetails
                        show={deleteSingleUser}
                        resetpassword={1}
                        onHide={() => { this.setState({ deleteSingleUser: false }); }}
                        bodyContent={singleUserDeleteContent}
                        onConfirm={() => { this.singleDeleteConfirmation(this.products); }}
                    />
                )}

                { deleteMultipleUser && (
                    newLocal
                )}
            </div>
        );
    }
}

Members.propTypes = {
    actions: PropTypes.objectOf(PropTypes.func),
    userDetailsData: PropTypes.array,
    addUserDetails: PropTypes.object,
};
const mapStateToProps = state => ({
    userDetailsData: state.userManagement.UserDetails ? state.userManagement.UserDetails : [],
    updateUserSuccess: state.userManagement.updateUserSuccess ? state.userManagement.updateUserSuccess : []
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(UserManagementAction), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Members);
