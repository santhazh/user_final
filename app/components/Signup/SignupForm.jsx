import React, { Component } from 'react';
import {
    ControlLabel, FormGroup, Button,
} from 'react-bootstrap';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { bindActionCreators } from 'redux';
import './Signup.scss';
import Recaptcha from 'react-recaptcha';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as SignUpAction from '../../actions/SignUpAction';
import floatingLabelField from '../FloatingLabel/FloatingLabel';
import { validateEmail, validatePassword, getEmailDomain } from '../../common/Utils';

// import { getEmailDomain } from '../common/Utils';
import { GOVT_EMAIL_EXTENSION } from '../../common/Constants';
import history from '../../history';


export const validate = values => {
    const error = {};
    let length = document.getElementById('length');
    let capital = document.getElementById('capital');
    let special = document.getElementById('special');
    let number = document.getElementById('number');

    if (length == null) {
        values.password = '';
    }

    const emailError = validateEmail(values);
    if (emailError) {
        error.emailId = emailError;
    }

    const errorObj = validatePassword(values, length, capital, special, number);
    if (errorObj.error) {
        error.password = errorObj.error;
        length = errorObj.length;
        capital = errorObj.capital;
        special = errorObj.special;
        number = errorObj.number;
    }

   return error;
};

export class SignupForm extends Component {
    constructor() {
        super();
        this.state = {
            recaptchaVerified: false,
            hasGovEmail: false,
            isGovEmail: false,
            serverErrorCheck: false,
        };
        this.GOVT_EMAIL_EXTENSION = ['.gov', '.mil', '.state', '.edu'];
    }

    componentWillMount = () => {
        this.setState({
            serverErrorCheck: true,
        });
    }

    recaptchaVerifyCallback = () => {
        this.setState({
            recaptchaVerified: true,
        });
    }

    componentWillReceiveProps = values => {
        const { SignUpUser } = values;
        if (SignUpUser.emailId) {
            const getDomain = getEmailDomain(SignUpUser.emailId);
            if (GOVT_EMAIL_EXTENSION.includes(getDomain)) {
                history.push('/gov');
            } else {
                history.push('/professional');
            }
        }
    }

    checkHasGovEmail = value => {
        const { emailId, reset } = this.props;
        let { SignUpError } = this.props;
        let isGovEmail = false;
        if (value.target.checked) {
            const getDomain = getEmailDomain(emailId);
            if (!this.GOVT_EMAIL_EXTENSION.includes(getDomain)) {
                isGovEmail = true;
            }
        } else if (!value.target.checked) {
            isGovEmail = false;
        }
        if (SignUpError) {
            SignUpError = '';
        }
        reset();
        this.setState({
            hasGovEmail: isGovEmail,
            isGovEmail: value.target.checked,
            serverErrorCheck: true
        });
    };

    isEmailHasGovermentEmail = e => {
        const { change, checkboxState, emailId } = this.props;
        const getDomain = getEmailDomain(emailId);

        if (getDomain && !this.GOVT_EMAIL_EXTENSION.includes(getDomain) && checkboxState) {
            change('emailId', '');
            e.preventDefault();
            this.setState({
                hasGovEmail: true,
            });
        }
    }

    recaptchaOnLoadCallback = () => '';

    render() {
        const { handleSubmit, SignUpError } = this.props;
        // const { handleSubmit } = this.props;
        // const { recaptchaVerified, hasGovEmail, isGovEmail } = this.state;
        const { recaptchaVerified, hasGovEmail, isGovEmail, serverErrorCheck } = this.state;
        const passwordCriteriaBox = document.getElementById('passwordCriteriaBox');

        const signupFormOnSubmit = values => {
            const submitValue = values;
            submitValue.signupStage = 0;
            submitValue.isSignupDone = false;
            const { actions } = this.props;
            actions.signUpRequest(submitValue);
            this.setState({
                serverErrorCheck: false,
            });
        };

        return (

            <div className="formWrap signupFormWrap">
                <form onSubmit={handleSubmit(signupFormOnSubmit)}>
                    <Field
                        name="emailId"
                        type="text"
                        component={floatingLabelField}
                        label={hasGovEmail
                            ? 'Enter government email ID' : 'Email'}
                        id="emailId"
                        />
                    {(SignUpError) && (!serverErrorCheck) ? <span className="server_error_text">{SignUpError}</span> : null}
                    <Field
                        name="password"
                        type="password"
                        component={floatingLabelField}
                        label="Create Password"
                        id="pswd"
                        onFocus={() => {
                            passwordCriteriaBox.style.display = 'block';
                        }}/>
                    <div id="passwordCriteriaBox">
                        <p id="length">
                            ✔ 8 characters minimum
                        </p>
                        <p id="capital">
                            ✔ At least 1 capital letter
                        </p>
                        <p id="special">
                            ✔ At least 1 special character (!,*,$,@)
                        </p>
                        <p id="number">
                            ✔ At least 1 numeric character
                        </p>
                    </div>
                    <FormGroup className="formRowWrap">
                        <ControlLabel className="label-styles">
                            Select only if applicable to your business
                        </ControlLabel>
                        <Field
                            name="checkbox"
                            type="checkbox"
                            checked={isGovEmail}
                            component="input"
                            className="checkbox-overrides"
                            onChange={this.checkHasGovEmail} />
                        <span className="checkbox-labelStyle">
                            I work for a government entity and I
                            have a government email
                        </span>
                    </FormGroup>
                    <FormGroup className="formRowWrap">
                        <Recaptcha
                            className="rca-styles"
                            sitekey="6LfKaWoUAAAAAJDt-nKlTsZ92TkprXJ2xqgZ-YND"
                            render="explicit"
                            verifyCallback={this.recaptchaVerifyCallback}
                            onloadCallback={this.recaptchaOnLoadCallback}
                        />
                    </FormGroup>
                    <div className="form-group formRowWrap">
                        <Button
                            type="submit"
                            className="btnBlueStyle createAccBtn"
                            disabled={!recaptchaVerified}>
                        Sign Up
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

SignupForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    emailId: PropTypes.string,
    checkboxState: PropTypes.bool,
    actions: PropTypes.objectOf(PropTypes.func),
    SignUpError: PropTypes.string,
    reset: PropTypes.func,
};


const SignupReduxForm = reduxForm({
    form: 'SignupForm',
    validate,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true
})(SignupForm);

const selector = formValueSelector('SignupForm');

const mapStateToProps = state => ({
    emailId: selector(state, 'emailId'),
    checkboxState: selector(state, 'checkbox'),
    SignUpError: state.signUp.error ? state.signUp.error : '',
    SignUpUser: state.signUp.signUpDetails ? state.signUp.signUpDetails : ''
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(SignUpAction), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupReduxForm);
