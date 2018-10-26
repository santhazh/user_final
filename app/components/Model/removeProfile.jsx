
import React from 'react';
import {
    Button, Row, Col, Modal
} from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import './removeProfile.scss';

class RemoveProfilePopUp extends React.Component {
    // constructor(props) {
    //     super(props);

    // }

    render() {
        const { onHide, handleSubmit } = this.props;
        const handleSubmitForm = () => {
            // history.push('./Email Concierge');
        };


return (

    <div className="deleteUserWrap signupFormWrap">
        <Modal {...this.props} id="newUserPopUp">
            <Modal.Body className="popUpBodyStyles ">
                <button onClick={onHide} type="button" className="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>

                <h1 className="deleteProfile">
                Are you sure you want to remove your profile from this organizations account?
                </h1>
                <p className="deleteProfileMidContentWrap"> You are removing yourself from Oprofessional. Your profile will not be linked to this organization and you will no longer have access to this dashboard and the exclusive deals and offers Oprofessional has to offer. If you would like to gain access to Oprofessional again you will need to register a new entity or join this organization again. </p>
                <p className="deleteProfileMidContentWrap"> You can still shop on overstock.com using these login credentials. </p>
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <Row>
                        <Col lg={6} sm={6}>
                            <div className="form-group formdeleteProfileLeftBtn">
                                <Button
                                    type="submit"
                                    onClick={() => onHide()}
                                    className="deleteProfileButtonWrap">
                                                Cancel
                                </Button>
                            </div>
                        </Col>
                        <Col lg={6} sm={6}>
                            <div className="form-group formdeleteProfileRightBtn">
                                <Button
                                    type="submit"
                                    className="deleteProfileButtonWrap"
                                    onClick={() => onHide()}>
                                                Confirm & Proceed
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </form>

            </Modal.Body>
        </Modal>
    </div>
            );
    }
}

RemoveProfilePopUp.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
    form: 'removeProfilePopUpDetails',
})(RemoveProfilePopUp);
