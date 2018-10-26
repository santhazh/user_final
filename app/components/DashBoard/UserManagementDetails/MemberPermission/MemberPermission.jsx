
import React from 'react';
import {
    Row, Col,
} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// // import { render } from 'react-dom';
// import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import './MemberPermission.scss';
import Switch from 'react-switch';
// import { connect } from 'react-redux';
import * as UserManagementAction from '../../../../actions/UserManagementAction';

export class MemberPermission extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            removeUserChecked: false,
            enableAdminMakePurchases: true,
            enableContributorInviteUsers: false,
            enableContributorMakePurchases: false
        };
        }

        handleChange = variableName => () => {
            this.setState({ [variableName]: !this.state[variableName] });
            const submitValue = { enableAdminMakePurchases: this.state.enableAdminMakePurchases, enableContributorInviteUsers: this.state.enableContributorInviteUsers, enableContributorMakePurchases: this.state.enableContributorMakePurchases };
            const { actions } = this.props;
            actions.userManagementUpdateUserRequest(submitValue);
        };


    render() {
        return (
            <div className="container">
                <Row>
                    <Col lg={6} sm={12} className="ContributorBoxWrap">
                        <h3 className="AdminWrapHeader"> Admin </h3>
                        <p className="AdminPurchaseTxtWrap">Make purchases </p>
                        <Switch
                            onChange={this.handleChange('enableAdminMakePurchases')}
                            checked={this.state.enableAdminMakePurchases}
                            className="react-switch"
                            id="normal-switch"
                            onColor="#416bad"
                            checkedIcon={false}
                            uncheckedIcon={false}
          />
                        <hr/>
                        <p className="AdminPurchaseTxtWrap"> Remove users</p>
                        <Switch
                            onChange={this.handleChange('removeUserChecked')}
                            checked={this.state.removeUserChecked}
                            className="react-switch"
                            id="normal-switch"
                            onColor="#416bad"
                            checkedIcon={false}
                            uncheckedIcon={false}
          />
                        <hr/>
                    </Col>
                    <Col lg={6} sm={12} className="ContributorBoxWrap">
                        <h3 className="ContributorWrapHeader"> Contributor </h3>
                        <p className="AdminPurchaseTxtWrap">Can invite external users to the company profile</p>
                        <Switch
                            onChange={this.handleChange('enableContributorInviteUsers')}
                            checked={this.state.enableContributorInviteUsers}
                            className="react-switch"
                            id="normal-switch"
                            onColor="#416bad"
                            checkedIcon={false}
                            uncheckedIcon={false}
          />
                        <hr/>
                        <p className="AdminPurchaseTxtWrap"> Make purchases </p>
                        <Switch
                            onChange={this.handleChange('enableContributorMakePurchases')}
                            checked={this.state.enableContributorMakePurchases}
                            className="react-switch"
                            id="normal-switch"
                            onColor="#416bad"
                            checkedIcon={false}
                            uncheckedIcon={false}
          />
                        <hr/>
                    </Col>
                </Row>
            </div>
        );
}
}

MemberPermission.propTypes = {
    actions: PropTypes.objectOf(PropTypes.func),
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(UserManagementAction), dispatch),
});


export default connect(null, mapDispatchToProps)(MemberPermission);
