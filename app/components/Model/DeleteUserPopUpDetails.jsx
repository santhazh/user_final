import React from 'react';
import {
    Button, Row, Col, Modal
} from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import './DeleteUserPopUp.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserManagementAction from '../../actions/UserManagementAction';

class DeleteUserPopUpDetails extends React.Component {
    confirm = () => {
        const { onConfirm, onHide, actions } = this.props;
        actions.userManagementDeleteUserRequest();
        // actions.userManagementMembersListRequest();
        onConfirm();
        onHide();
    }

    render() {
        const { handleSubmit, onHide, bodyContent, multipleUserDetails } = this.props;
        const handleSubmitForm = () => {
        };

        return (
            <Modal {...this.props} id="deleUserPopup">
                <Modal.Body>
                    <div className="deleteUserWrap signupFormWrap">
                        <Col sm={12}>
                            <button type="button" className="close" id="deleteUserPopUpClose" onClick={onHide} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </Col>
                        <h1 className="deleteUserHeaderWrap">
                            {bodyContent.title}
                        </h1>
                        <p className="deleteUserMidContentWrap">
                            {bodyContent.content}
                        </p>
                        {multipleUserDetails && multipleUserDetails.map(obj => {
                            return (
                                <Row>
                                    <Col className="userNameStyles" md={12}>{obj.name}</Col>
                                    <Col className="userEmailStyles" md={12}>{obj.email}</Col>
                                </Row>
                            );
                        })}

                        <form onSubmit={handleSubmit(handleSubmitForm)}>
                            <Row>
                                <Col lg={6} sm={12}>
                                    <div className="form-group formRowWrap">
                                        <Button
                                            type="submit"
                                            onClick={() => onHide()}
                                            className="deleteUserButtonWrap">
                                            Cancel
                                        </Button>
                                    </div>
                                </Col>
                                <Col lg={6} sm={12}>
                                    <div className="form-group formRowWrap">
                                        <Button
                                            type="submit"
                                            className="deleteUserButtonWrap"
                                            onClick={this.confirm}>
                                            Remove
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

DeleteUserPopUpDetails.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onHide: PropTypes.func
};

// const mapStateToProps = state => ({
//     emailId: selector(state, 'emailId'),
//     userDetailsData: state.userManagement.userListResponse
// });

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(UserManagementAction), dispatch),
});

const DeleteUserPopUpForm = reduxForm({
    form: 'DeleteUserPopUpDetails',
})(DeleteUserPopUpDetails);

export default connect(null, mapDispatchToProps)(DeleteUserPopUpForm);
