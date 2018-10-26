import React from 'react';
import { Router, Route } from 'react-router';
import Favicon from 'react-favicon';
import PrivateRoute from './Components/PrivateRouter/PrivateRouter';
import history from './history';
import BtoCMigrationFrom from './Components/BtoCMigrationFrom/BtoCMigrationFrom';
import SignUpPage from './Components/Signup/SignupPage';
import HomePage from './Components/HomePage/HomePage';
import ForgotPasswordEmailTemplate from './Components/ForgotPassword/ForgotPasswordEmailTemplate/ForgotPasswordEmailTemplate';
import MainLayout from './Components/MainLayout';
// import FavImg from '../assets/Images/favicon.ico';
import Professional from './Components/Professional/Professional';
import Govt from './Components/Govt/Govt';
import ForgotPasswordPopUp from './Components/ForgotPassword/ForgotPasswordPopUp/ForgotPasswordPopUp';
import SignInTwoStepAuthentication from './Components/Signin/SigninTwoStepAuthentication/SigninTwoStepAuthentication';
import SignIn from './Components/Signin/Signin';
import { SUCCESSFUL_ACCOUNT_CREATION, SUCCESSFUL_LOGIN, FAV_ICON_BASE64 } from './common/Constants';
import DashboardScreen from './Components/DashBoard/DashboardScreen';
import OprofessionalHomePage from './components/HomePage/OprofessionalHomePage';
// import userManagementTabs from './Components/DashBoard/UserManagementTabs/userManagementTabs';

const App = () => (
    <MainLayout>
        <Favicon url={FAV_ICON_BASE64} />
        <section id="mainWrap">
            <Router history={history}>
                <React.Fragment>
                    <PrivateRoute exact path="/" component={<h1>B2B Home Page</h1>} />
                    <Route path="/opro" component={SignUpPage} />
                    <Route path="/signup" component={SignUpPage} />
                    <Route path="/signin" component={SignIn} />
                    <Route path="/btoc-migration-from" component={BtoCMigrationFrom} />
                    <Route path="/professional" component={Professional} />
                    <Route path="/gov" component={Govt} />
                    <Route path="/user-migration-confirmation" component={SignUpPage} />
                    <Route path="/home" render={routeProps => <HomePage {...routeProps} bodycontent={SUCCESSFUL_ACCOUNT_CREATION} />} />
                    <Route path="/email-template" component={ForgotPasswordEmailTemplate} />
                    <Route path="/reset-new-password" component={ForgotPasswordPopUp} />
                    <Route path="/signin-two-way-auth" component={ForgotPasswordPopUp} />
                    <Route path="/professionalHome" render={routeProps => <HomePage {...routeProps} bodycontent={SUCCESSFUL_LOGIN} />} />
                    <Route path="/signin-two-step-authentication" component={SignInTwoStepAuthentication} />
                    <Route path="/dashboard" component={DashboardScreen} />
                    <Route path="/oprofessionalHome" component={OprofessionalHomePage} />
                </React.Fragment>
            </Router>
        </section>
    </MainLayout>
);

export default App;
