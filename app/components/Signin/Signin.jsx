import React from 'react';
import axios from 'axios';
import './Signin.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignInForm from './SigninForm/SigninForm';
import * as SignInAction from '../../actions/SigninAction';
import SignInOtpPhoneNumber from './SigninOtpPhoneNumber/SigninOtpPhoneNumber';
import SignInOtpVerification from './SigninOtpVerification/SigninOtpVerification';
// import history from '../../history';

const steps = [{ id: 0 }, { id: 1 }, { id: 2 }];
export class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            currentStep: steps[0],
            // formSubmitSuccess: false,
            signInUserEmailId: '',
            b2cSignInPwd: '',
        });
    }

  nextPage = () => {
    const { currentStep } = this.state;
    this.setState({ currentStep: steps[currentStep.id + 1] });
  }

  previousPage = () => {
    const { currentStep } = this.state;
    this.setState({ currentStep: steps[currentStep.id - 1] });
  }

SignInRequestActionSend = values => {
    const { actions } = this.props;
    actions.signInRequest(values);
    this.setState({ b2cSignInPwd: values.password });
    // console.log('values',values);
    // const b2curl = 'https://www.overstock.com/myaccount?cst_email=';
    // const b2curlpassword = '&cst_password=';
    // const b2curlloginparams = '&bvkey_myacckey=myacckey&myacckey=order_info&processlogin=true&loggingin=true&submit=true';
    // const config_url = `${b2curl}${values.emailId}${b2curlpassword}${values.password}${b2curlloginparams}`;
    // console.log('config_url', config_url);
    // axios.post(config_url,{
    //     headers : {
    //         'Access-Control-Allow-Origin': '*',
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json'
    //         }
    // })
    // .then(response => {
    //     window.location.href = config_url;
    // })
    // .catch(function(error){
    //     console.log('error',error);
    // });
}

componentWillReceiveProps = values => {
    const { b2cSignInPwd } = this.state;
    const { signInUser } = values;
    const { id } = signInUser;
    console.log('signInUser', signInUser);
    if (id !== '') {
        const b2curl = 'https://www.overstock.com/myaccount?cst_email=';
        const b2curlpassword = '&cst_password=';
        const b2curlloginparams = '&bvkey_myacckey=myacckey&myacckey=order_info&processlogin=true&loggingin=true&submit=true';
        const configUrl = `${b2curl}${signInUser.emailId}${b2curlpassword}${b2cSignInPwd}${b2curlloginparams}`;
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

AuthenticationRequired = values => {
    // const { isAuthenticationRequired } = values;
    // this.setState({ formSubmitSuccess: isAuthenticationRequired });
    this.SignInRequestActionSend(values);
    // console.log('open', open);
}

  render() {
    const { currentStep, signInUserEmailId } = this.state;
    let routingTo = '';
    const { location } = this.props;
    if (location && location.query && location.query.routingTo) {
        routingTo = location.query.routingTo;
        location.query.routingTo = undefined;
    }

return (
    <div>
        {routingTo === 'redirectingToTwoStepAuth'
            ? [this.nextPage()]
            : null
        }
        {currentStep.id === 0
    && (
        <SignInForm
            onSubmit={this.AuthenticationRequired}
        />
    )}
        {currentStep.id === 1
    && (
        <SignInOtpPhoneNumber
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
            inputVal={signInUserEmailId}
        />
    )}
        {currentStep.id === 2
    && (
        <SignInOtpVerification
            previousPage={this.previousPage}
            onSubmit={this.nextPage} />
    )}
    </div>
    );
  }
}

SignIn.propTypes = {
    location: PropTypes.object,
    actions: PropTypes.objectOf(PropTypes.func),
    // signInUser: PropTypes.string,
};

const mapStateToProps = state => ({
    signInUser: state.signIn.SignInUser ? state.signIn.SignInUser : ''
    // SignInError: state.signIn.error ? state.signIn.error : ''
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(SignInAction), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
