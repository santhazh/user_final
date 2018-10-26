import React, { Component, Fragment } from 'react';
import { Modal, Button, FormGroup, FormControl, Row, Col } from 'react-bootstrap';
import './InviteExtlMemberPopup.scss';
import { Field } from 'redux-form';
import AddGroupPopup from './AddGroupPopup';

class InviteExtMember extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isExternalMemberAdded: false,
            displayCurrentMembers: false,
            currentMembersList: [],
            isExpandedList: true,
        };
    }

    redirect = () => {
        this.setState({
            isExternalMemberAdded: true
        });
        // const obj = {'item':newItemInput, 'columnType':newRadioValue};
        // const newArray = this.state.buyItems.slice(); // Create a copy
        // newArray.push(obj); // Push the object
        // this.setState({ buyItems: newArray });
        // console.log(this.state.buyItems);
    }

    render() {
    const { onHide, handleSubmit } = this.props;
    const { isExternalMemberAdded } = this.state;

        return (
            <Fragment>
                {isExternalMemberAdded && <AddGroupPopup show={isExternalMemberAdded} onHide={() => { this.setState({ isExternalMemberAdded: false }); }} />}
                {!isExternalMemberAdded && (
                <Modal {...this.props} className="customPopupWrap" >
                    <form onSubmit={handleSubmit}>
                        <Modal.Header className="header-styles inviteExtMemHeaderStyle">
                            <Modal.Title id="inviteExtMemberPopup">
                                Invite to group
                                <button onClick={onHide} type="button" className="close" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </Modal.Title>

                            <Field
                                name="externalMember"
                                type="text"
                                component="input"
                                value="test"
                                // component={floatingLabelField}
                                id="externalMember"
                                placeholder="Invite company member"/>
                            <FormGroup controlId="formControlsSelect">
                                <FormControl componentClass="select" placeholder="select" className="inviteGroupRoleSelectDropDown">
                                    <option value="select">Contributor</option>
                                    <option value="other">Admin</option>
                                </FormControl>
                            </FormGroup>

                        </Modal.Header>
                        <Modal.Body className="inviteExtMembContentStyle">
                            noname@gmail.com is not a member of your account.
                            Would  you like to add this external user to account?
                        </Modal.Body>
                        <Modal.Footer className="modal-footer-styles">
                            <Button className="modal-button-styles" onClick={onHide}>No</Button>
                            <Button className="modal-button-styles" onClick={this.redirect}>Yes</Button>
                        </Modal.Footer>
                    </form>
                </Modal>)}
            </Fragment>
        );
    }
}

export default InviteExtMember;
