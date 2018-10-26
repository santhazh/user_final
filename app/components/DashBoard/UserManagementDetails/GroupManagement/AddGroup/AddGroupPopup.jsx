import React, { Component, Fragment } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import './AddGroupPopup.scss';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _filter from 'lodash/filter';
import PropTypes from 'prop-types';
import _forEach from 'lodash/forEach';
import * as GroupManagementAction from '../../../../../actions/GroupManagementAction';
import InviteExtMember from './InviteExtlMemberPopup';
import * as UserManagementAction from '../../../../../actions/UserManagementAction';

class AddGroupPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayCurrentMembers: false,
            isExpandedList: true,
            membersList: [],
            currentMembersList: [],
            inviteExternalMember: false,
            isExternalMemberAdded: false
        };
        this.usersDetails = [
            {
                id: 1,
                name: 'Jane Doe',
                email: 'janedoe@overstock.com',
                role: 'Admin',
                group: 'Maintenance'
            },
            {
                id: 2,
                name: 'John Doe',
                email: 'john@overstock.com',
                role: 'contributer',
                group: 'Maintenance'
            },
            {
                id: 3,
                name: 'Nike',
                email: 'nike@overstock.com',
                role: 'contributer',
                group: 'Maintenance'
            }
        ];
    }

    componentWillMount() {
        const { actions } = this.props;
        actions.userManagementRequest();
    }

    addMember = (selectedObj, existingMembersList) => {
        const { currentMembersList } = this.state;
        // This filter is to remove the user after adding from the add members list
        const filteredList = _filter(existingMembersList, obj => {
            return obj.id !== selectedObj.id;
        });

        // This loop will store the selected user in currentMembersList array
        _forEach(existingMembersList, obj => {
            if (obj.id === selectedObj.id) {
                currentMembersList.push(obj);
            }
        });

        this.setState({
            displayCurrentMembers: true,
            isExpandedList: true,
            membersList: filteredList,
            currentMembersList
        });
    }

    toggleCurrentList = () => {
        const { isExpandedList } = this.state;
        this.setState({
            isExpandedList: !isExpandedList
        });
    }

    updateGroup = () => {
        const { currentMembersList } = this.state;
        const { onUpdate, groupDetail } = this.props;
        groupDetail.currentMembersList = currentMembersList;
        groupDetail.usersDetails = this.usersDetails;
        onUpdate(groupDetail);
    }

    cancelMembFromAddition = () => {
        this.setState({
            inviteExternalMember: false
        });
    }

    addMembToAccount = () => {
        this.setState({
            isExternalMemberAdded: true
        });
    }

    render() {
        const { onHide, groupDetail, onUpdate, actions, userdetailsdata, currentUsers } = this.props;
        const { displayCurrentMembers, isExpandedList, membersList, inviteExternalMember, isExternalMemberAdded } = this.state;
        let { currentMembersList } = this.state;
        if (groupDetail.isGroupEdit) {
            currentMembersList = groupDetail.currentMembersList.length ? groupDetail.currentMembersList : currentMembersList;
            this.usersDetails = groupDetail.usersDetails.length ? groupDetail.usersDetails : this.usersDetails;
            groupDetail.isGroupEdit = false;
            this.setState({
                currentMembersList
             });
        }
        if (displayCurrentMembers) {
            this.usersDetails = membersList;
        }

        return (
            <Fragment>
                <Modal {...this.props} className="customPopupWrap container" >
                    <Modal.Header className="header-styles">
                        <Modal.Title id="addGroupMembPopup">
                            {!inviteExternalMember && groupDetail.groupName}
                            <button onClick={onHide} type="button" className="close" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </Modal.Title>
                        <form>
                            <Field
                                name="externalMember"
                                type="text"
                                component="input"
                                id="externalMember"
                                placeholder="Search for users to add or invite external users by email"/>
                        </form>
                    </Modal.Header>
                    <Modal.Body className="modal-body-styles">
                        {!inviteExternalMember && (
                        <Fragment>
                            {currentMembersList.length && (
                                <div className={(currentMembersList.length > 1) ? 'gm-custom-scrollbar' : ''}>
                                    <h3>
                                        {`${currentMembersList.length} current members`}
                                        <i onClick={this.toggleCurrentList} className={isExpandedList ? 'fa fa-chevron-up' : 'fa fa-chevron-down'} />
                                    </h3>
                                    {isExpandedList && (
                                        <ul>
                                            {currentMembersList.map(obj => (
                                                <li>
                                                    <Row className="gm-current-members">
                                                        <Col xs={2}><span className="circle-icon-plus">jd</span></Col>
                                                        <Col xs={8}>
                                                            <p>{obj.email}</p>
                                                            <p>{obj.role}</p>
                                                        </Col>
                                                        <Col xs={2}><i className="fa fa-check circle-icon-plus" /></Col>
                                                    </Row>
                                                    <hr />
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>)
                            }
                            <div className={(this.usersDetails.length > 4) ? 'gm-custom-scrollbar' : ''}>
                                <h3>Add members</h3>
                                <ul>
                                    {this.usersDetails.map(obj => (
                                        <li>
                                            <Row>
                                                <Col xs={2}><span className="circle-icon-plus">jd</span></Col>
                                                <Col xs={8}>
                                                    <p>{obj.email}</p>
                                                    <p>{obj.role}</p>
                                                </Col>
                                                <Col xs={2}><i onClick={() => { this.addMember(obj, this.usersDetails); }} className="fa fa-plus circle-icon-plus" /></Col>
                                            </Row>
                                            <hr />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Fragment>
                        )}
                    </Modal.Body>
                    <Modal.Footer className="modal-footer-styles">
                        {!inviteExternalMember && <Button className="modal-button-styles updateGroupButtonStyle" onClick={() => { this.updateGroup(); }}>Update Group</Button>}
                    </Modal.Footer>
                </Modal>
                {isExternalMemberAdded && <InviteExtMember show={inviteExternalMember} onHide={() => { this.setState({ inviteExternalMember: false }); }}/>}
            </Fragment>
        );
    }
}

AddGroupPopup.propTypes = {
    actions: PropTypes.object,
    userdetailsdata: PropTypes.array,
    groupDetail: PropTypes.object,
    onUpdate: PropTypes.func,
};

const AddGroup = reduxForm({
    form: 'AddGroupPopup',
})(AddGroupPopup);

const selector = formValueSelector('AddGroupPopup');
const mapStateToProps = state => ({
    externalMemberId: selector(state, 'externalMember'),
    userdetailsdata: state.userManagement.UserDetails ? state.userManagement.UserDetails : []
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, GroupManagementAction, UserManagementAction), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddGroup);

// export default connect(null, mapDispatchToProps)(AddGroupPopup);
