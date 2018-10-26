import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Row, Col,
} from 'react-bootstrap';
import axios from 'axios';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import { REG_SUCCESS_MESSAGE_FIRST_HALF, REG_SUCCESS_MESSAGE_SECOND_HALF, REG_NOTIFICATION_MESSAGE } from '../../common/Constants';
import './OprofessionalHomePage.scss';
import * as SignUpAction from '../../actions/SignUpAction';

class OprofessionalHomePage extends Component {
    componentWillMount() {
        const { actions } = this.props;
        actions.getSignUpDetails();
    }

    redirectToB2C = () => {
        const { signUpDetails } = this.props;

        if (signUpDetails.id !== '') {
            const b2curl = 'https://www.overstock.com/myaccount?cst_email=';
            const b2curlpassword = '&cst_password=';
            const b2curlloginparams = '&bvkey_myacckey=myacckey&myacckey=order_info&processlogin=true&loggingin=true&submit=true';
            const configUrl = `${b2curl}${signUpDetails.emailId}${b2curlpassword}${signUpDetails.password}${b2curlloginparams}`;
            axios.post(configUrl, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                 }
            })
            .then(response => {
                console.log(response);
                window.location.href = configUrl;
            });
        }
    }

    render() {
        return (
            <div id="opro-home" className="container-fluid">
                <Row className="start-shopping-button-area">
                    <Col sm={12} className="formBtnWrap">
                        <button
                            className="formBtn"
                            type="button"
                            onClick={this.redirectToB2C}>
                            Start Shopping
                        </button>
                    </Col>
                </Row>
                <div id="opro-reg-message" className="container">
                    <Row>
                        <Col sm={12} className="opro-header">
                            <h1>Welcome to Opro Beta</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} className="opro-message">
                            <p className="opro-mesg-first">
                                {REG_SUCCESS_MESSAGE_FIRST_HALF}
                            </p>
                            <Row>
                                <Col sm={12}>
                                    <p className="opro-mesg-second">
                                        {REG_SUCCESS_MESSAGE_SECOND_HALF}
                                    </p>
                                </Col>
                                <Col sm={12}>
                                    <div className="opro-discount-style">
                                        <div className="opro-discount-tag">
                                            <div className="opro-discount-label">
                                                <span className="opro-discount-rate">
                                                    15
                                                    <span className="opro-discount-percentage-wrap">
                                                        <span className="opro-discount-percentage">%</span>
                                                        <span className="opro-discount-off">OFF</span>
                                                    </span>
                                                </span>
                                                    COUPON**
                                            </div>
                                        </div>
                                        <button
                                            className="formBtn"
                                            type="button"
                                            onClick={this.redirectToB2C}>
                                            Shop Now
                                        </button>
                                    </div>
                                </Col>
                                <Col sm={12}>
                                    <p>
                                        {REG_NOTIFICATION_MESSAGE}
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

OprofessionalHomePage.propTypes = {
    actions: PropTypes.func.isRequired,
    signUpDetails: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    signUpDetails: state.signUp.signUpDetails ? state.signUp.signUpDetails : {},
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(SignUpAction), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(OprofessionalHomePage);
// export default OprofessionalHomePage;
