import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as SignInAction from '../../../actions/SigninAction';
import './SigninForm.scss';
import floatingLabelField from '../../FloatingLabel/FloatingLabel';
import { validateEmail } from '../../../common/Utils';

export const validate = values => {
    const error = {};

    const emailError = validateEmail(values);
    if (emailError) {
        error.emailId = emailError;
    }
    if (!values.password) {
        error.password = 'Required';
    }

return error;
};

/* eslint-disable react/prop-types */
export const checkBoxField = ({
    placeholder, label, type, input,
}) => (
    <p>
        <input
            {...input}
            placeholder={placeholder}
            type={type}
            className="checkBoxStyle" />
        {label}
    </p>);

export class SignInForm extends React.Component {
    constructor() {
        super();
        this.state = {
            // CookiesVerify: false,
            serverErrorCheck: false,
        };
    }

    componentWillMount() {
        // console.log(CookieUser.email);
        // const CookieUser = Cookies.get('LoginUser');
        // console.log(CookieUser);
        // if (!CookieUser) {
        //     this.setState({ CookiesVerify: false });
        // } else {
        //     this.setState({ CookiesVerify: true });
        // }

        this.setState({ serverErrorCheck: true });
    }

    componentDidMount() {
        document.addEventListener('keydown', this.escFunction, false);
    }

    handleChange = event => {
        const { emailId, password } = this.props;
        if (event.target.checked) {
            Cookies.set('LoginUser', { emailId, password });
        } else {
            Cookies.remove('LoginUser');
        }
    };

    errorCheckChange = () => {
        this.setState({ serverErrorCheck: false });
    }

    escFunction(event) {
        if (event.keyCode === 32) {
            event.preventDefault();
        }
    }

    render() {
        const { handleSubmit, SignInError } = this.props;
        const { pathname } = location;
        const { serverErrorCheck } = this.state;

    return (
        <div className={pathname && pathname === '/signup' ? 'formWrap' : 'formWrap loginAuthInsideWrap'}>
            <h1
                className={pathname && pathname === '/signup'
                ? 'title_h1 signinTitle deactive' : 'title_h1 signinTitle'}>
                Sign in to your Oprofessional Account
            </h1>
            <form onSubmit={handleSubmit}>
                <Field
                    name="emailId"
                    component={floatingLabelField}
                    label="Email"
                    placeholder="Email"
                    />
                {(SignInError) && (!serverErrorCheck) ? <span className="server_error_text">{SignInError}</span> : null}
                <Field
                    name="password"
                    type="password"
                    component={floatingLabelField}
                    label="Password"
                    placeholder="Password" />

                {/*  <div className="form-group secureVerifyTxt" id={CookiesVerify ? 'CookiesVerifyed' : null}>
                    <p>
                        Secure your Oprofessional
                        account with two-step authentication
                    </p>
                    <div className="checkbox-authVerify checkbox"> */}
                {/* <Field
                            name="isCookiesVerifyed"
                            type="checkbox"
                            component={checkBoxField}
                            checked={CookiesVerify ? 'true' : 'false'}
                            label="authentication"/> */}
                {/* <Field
                            name="isAuthenticationRequired"
                            type="checkbox"
                            component={checkBoxField}
                            label=" Verify my account
                                    with two-step authentication"/>
                    </div>
                </div> */}
                <div className="form-group formRowWrap">
                    <Button
                        type="submit"
                        className="btnBlueStyle createAccBtn"
                        onClick={this.errorCheckChange}>
                            Sign In
                    </Button>
                </div>
            </form>
        </div>
    );
    }
}

SignInForm.propTypes = {
    SignInError: PropTypes.string,
};


export const SignInReduxForm = reduxForm({
    form: 'signIn',
    validate,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(SignInForm);

const CookieUser = Cookies.get('LoginUser')
    ? JSON.parse(Cookies.get('LoginUser')) : {};
const mapStateToProps = state => ({
    stateValue: state,
    enableReinitialize: true,
    initialValues: {
        emailId: CookieUser.emailId || '',
        password: CookieUser.password || '',
        isAuthenticationRequired: false
    },
    signInUser: state.signIn.SignInUser ? state.signIn.SignInUser : '',
    SignInError: state.signIn.error ? state.signIn.error : ''
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(SignInAction), dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(SignInReduxForm);
