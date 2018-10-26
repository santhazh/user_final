import React from 'react';
import { Link } from 'react-router-dom';
import './SigninTwoStepAuthentication.scss';

const bgStyle = {
    width: '100%',
    float: 'left',
};

class SignInTwoStepAuthentication extends React.Component {
    render() {
        return (
            <div>
                <img src={Background} alt="home background" style={bgStyle}/>
                <div className="twostep_auth_wrap">
                    <span>
                        Office Supplies
                    </span>
                    <Link to={{ pathname: '/signin', query: { routingTo: 'redirectingToTwoStepAuth' } }}> Verify your account using our two-step authentication process </Link>
                </div>
                <img src={Backhomepage} alt="home background" style={bgStyle}/>
            </div>
        );
    }
}

export default SignInTwoStepAuthentication;
