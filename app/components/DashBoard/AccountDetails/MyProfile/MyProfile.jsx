
import React, { Component } from 'react';
import {
ControlLabel, Col, Row
} from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import Switch from 'react-switch';
import { Icon } from 'react-icons-kit';
import { eye } from 'react-icons-kit/fa/eye';
import { eyeSlash } from 'react-icons-kit/fa/eyeSlash';
import { USER_ROLES } from '../../../../common/Constants';
import floatingLabelField from '../../../FloatingLabel/FloatingLabel';
import './MyProfile.scss';
import { validateEmail, validatePassword } from '../../../../common/Utils';
import RemoveProfilePopUp from '../../../Model/removeProfile';

export const userRolesDropDown = ({ label, input, meta: { touched, error } }) => (
    <div className={input.value === ''
        ? 'form-group' : 'form-group labelActive'}>
        <div className={touched
            && error ? 'floatLabelWrap errorBorder' : 'floatLabelWrap'}>
            <select {...input} className="inputTxtStyle">
                <option value="" disabled />
                {USER_ROLES.map(obj => (
                    <option value={obj.value} key={obj.id}>
                        {obj.value}
                    </option>
                ))}
            </select>
            <ControlLabel className="labelTxt">{label}</ControlLabel>
            {touched && error && <span className="error_text">{error}</span>}
        </div>
    </div>
);
export const positiveValue = value => (
value && value <= 0 ? 'Must be positive values' : undefined);

export const validate = values => {
const error = {};

let length = document.getElementById('length');
    let capital = document.getElementById('capital');
    let special = document.getElementById('special');

    if (length == null) {
        values.password = '';
    }
const emailError = validateEmail(values);
if (emailError) {
    error.emailId = emailError;
}

if (!values.profilePassword) {
    error.profilePassword = 'Required';
}

const errorObj = validatePassword(values, length, capital, special);
if (errorObj.error) {
    error.password = errorObj.error;
    length = errorObj.length;
    capital = errorObj.capital;
    special = errorObj.special;
}


if (values.password !== values.confirmNewPassword) {
    error.confirmNewPassword = 'Please provide matching password';
}

return error;
};

export const renderField = ({
placeholder, input, label, type, meta: { touched, error },
}) => (
    <div className="form-group">
        <ControlLabel className="labelTxt">{label}</ControlLabel>
        <input
            {...input}
            placeholder={placeholder}
            type={type}
            className="form-control SqaureText" />
        {touched && ((error && (<span className="errorTxt">{error}</span>)))}
    </div>
);

export const phoneChange = (length, event) => {
const elemtName = event.target.name;
const value = event.target.value.toString();
const valueLength = value.length;
if (valueLength >= length) {
if (elemtName === 'comPhoneText1') {
document.getElementsByName('comPhoneText2')[0].focus();
} else if (elemtName === 'comPhoneText2') {
document.getElementsByName('comPhoneText3')[0].focus();
}
}
// console.log('valueLength###$', valueLength);
if (valueLength === 0) {
if (elemtName === 'comPhoneText3') {
document.getElementsByName('comPhoneText2')[0].focus();
} else if (elemtName === 'comPhoneText2') {
document.getElementsByName('comPhoneText1')[0].focus();
}
}
};

export const customPhoneField = ({
maxLength, placeholder, input, type, meta: { touched, error },
}) => (
    <div className="form-group">
        <input
            {...input}
            maxLength={maxLength}
            placeholder={placeholder}
            type={type}
            className="form-control SqaureText"
            onKeyUp={phoneChange.bind(this, maxLength)} />
        {touched && ((error && (<span className="errorPhnTxt">{error}</span>)))}
    </div>
);

class FieldFileInput extends Component {
constructor(props) {
super(props);
this.onChange = this.onChange.bind(this);
}

onChange(e) {
const { input: { onChange } } = this.props;
onChange(e.target.files[0]);
}

render() {
const { input: { value } } = this.props;
const { input, label } = this.props;
 // whatever props you send to the component from redux-form Field

return (
    <div>
        <ControlLabel>{label}</ControlLabel>
        <div className="file fileSpace">
            <input
                type="file"
                id="file-input"
                accept=".jpg, .png, .jpeg, .pdf, .txt"
                onChange={this.onChange}
/>
            <ControlLabel htmlFor="file-input">Change</ControlLabel>

        </div>
    </div>
);
}
}
export const normalizeZip = value => {
if (!value) {
return value;
}
const onlyNums = value.replace(/[^\d]/g, '');

return onlyNums;
};

const normalizePhone = value => {
if (!value) {
return value;
}

const onlyNums = value.replace(/[^\d]/g, '');
if (onlyNums.length <= 3) {
return onlyNums;
}
if (onlyNums.length <= 7) {
return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
}

return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(
6,
10
)}`;
};

class MyProfile extends Component {
constructor(props) {
super(props);
this.state = {
    profileName: '',
    property: props,
    isFocused: false,
    profileEmail: '',
    accountType: '',
    profilePass: '',
    profileNewPassword: '',
    saveCh: false,
    promotionalchecked: true,
    dealschecked: true,
    liquidationchecked: true,
    directmailchecked: true,
    unsubscribechecked: false,
    isPasswordVisible: false,
    removeprofile: false,
};
}

componentDidMount() {
axios.get('../../../../data.json')
.then(res => {
const profileName = res.data && res.data.Name;
const profileEmail = res.data && res.data.Email;
const accountType = res.data && res.data.AccountType;
const profilePass = res.data && res.data.ProfilePassword;
this.setState({ profileName });
this.setState({ profileEmail });
this.setState({ accountType });
this.setState({ profilePass });
const { initialize } = this.props;
initialize({
professtionalName: profileName,
emailId: profileEmail,
profileAccount: accountType,
profilePassword: profilePass,
});
});
}


changeButton = () => {
this.setState({
isFocused: true,
saveCh: false,
});
};

saveChanges = values => {
    this.setState({
        saveCh: true,
    });
    const passwordCriteriaBox = document.getElementById('passwordCriteriaBox');
    passwordCriteriaBox.style.display = 'none';
    values.password = '';
    values.confirmNewPassword = '';
};

showHidePasswrd = () => {
    const { isPasswordVisible } = this.state;
    const toggledIsShow = isPasswordVisible ? false : true;
    this.setState({
        isPasswordVisible: toggledIsShow
    });
}

removeProfile = () => {
    const { removeprofile } = this.state;
    this.setState({ removeprofile: true });
};

closeModelRemoveFile = () => {
    this.setState({
        removeprofile: false,
    });
}


render() {
const { property, saveCh, isPasswordVisible, removeprofile } = this.state;
const { handleSubmit } = property;
const passwordCriteriaBox = document.getElementById('passwordCriteriaBox');

return (

    <div>
        { removeprofile
                ? (
                    <RemoveProfilePopUp
                        show={removeprofile}
                        onHide={this.closeModelRemoveFile}
                    />
            ) : null }
        <div className="myProfileFormWrap">
            <form
                onSubmit={handleSubmit(this.saveChanges)}
                className="formListWrap"
                onFocus={this.changeButton}>
                <Row>
                    <Col lg={6} md={6} className="accountHeadClass" >
                        <ul >
                            <Row>
                                <Col lg={12} sm={12}>
                                    <p className="HeaderTxt_ComBu">
                                        <b className="HeaderTxt_MyProfile">
Edit Profile
                                        </b>
                                    </p>
                                </Col>
                            </Row>
                            <Row className="myProfileLeftContentWrap">
                                <Col lg={1} sm={1} >
                                    <i className="fa fa-user-circle userIcon" />
                                </Col>
                                <Col lg={10} md={10} >
                                    <div className="companyProfFileuploadbuton">
                                        <Field
                                            name="uploadFile"
                                            component={FieldFileInput}

/>
                                    </div>
                                </Col>

                                <li>
                                    <Field
                                        name="professtionalName"
                                        type="text"
                                        label="Name"
                                        component={floatingLabelField}

/>
                                </li>
                                <li>
                                    <Field
                                        name="emailId"
                                        type="text"
                                        label="Email"
                                        component={floatingLabelField}
/>
                                </li>
                                <li>
                                    <Field
                                        name="profilePhone"
                                        type="text"
                                        label="Phone"
                                        component={floatingLabelField}
                                        normalize={normalizePhone}
/>
                                </li>
                                <li>
                                    <Field
                                        name="profileAccount"
                                        type="text"
                                        label="Account type"
                                        component={userRolesDropDown}
                                    />
                                </li>
                                <li>
                                    <Field
                                        name="profilePassword"
                                        type={isPasswordVisible ? 'text' : 'password'}
                                        label="Current Password"
                                        id="myInput"
                                        showHide="txt"
                                        showEyeIcon={<span className="eyeIconWrap" onClick={this.showHidePasswrd}>{isPasswordVisible ? <Icon size={20} icon={eye} /> : <Icon size={20} icon={eyeSlash} />}</span>}
                                        component={floatingLabelField}
                                />
                                </li>

                                <li>
                                    <Field
                                        name="password"
                                        type="password"
                                        label="New Password"
                                        component={floatingLabelField}
                                        id="pswd"
                                        onFocus={() => {
                                        passwordCriteriaBox.style.display = 'block';
                                    }}
                                   />
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
                                    </div>

                                    <Field

                                        name="confirmNewPassword"
                                        type="password"
                                        label="Confirm New Password"
                                        component={floatingLabelField}
/>
                                </li>
                            </Row>
                        </ul>
                    </Col>

                    <Col lg={6} md={6} className="preferences">
                        <Row>
                            <ul>
                                <li>
                                    <Col lg={12} sm={12}>
                                        <p className="HeaderTxt_ComBu">
Communication preferences
                                        </p>
                                    </Col>
                                </li>
                                <Row className="myProfileRightContentWrap">
                                    <li>
                                        <Col lg={12} sm={12}>
                                            <Row>
                                                <Col lg={6} sm={6}>
                                                    <p>
                                                    Promotional mail
                                                    </p>


                                                </Col>
                                                <Col lg={6} sm={6}>
                                                    <Switch
                                                        onChange={() => { this.setState({ promotionalchecked: !this.state.promotionalchecked }); }}
                                                        checked={this.state.promotionalchecked}
                                                        className="react-switch"
                                                        id="normal-switch"
                                                        onColor="#416bad"
                                                        checkedIcon={false}
                                                        uncheckedIcon={false}


          />
                                                </Col>
                                            </Row>
                                            <p>

Sign up and receive exclusive email offers.
T&amp;C&apos;s and Privacy Policy

                                            </p>
                                            <hr/>

                                        </Col>
                                    </li>
                                    <li className="preferences">
                                        <Col lg={12} sm={12}>
                                            <Row >
                                                <Col lg={6} sm={6}>
                                                    <p>

Flash deals

                                                    </p>
                                                </Col>
                                                <Col lg={6} sm={6}>
                                                    <Switch
                                                        onChange={() => { this.setState({ dealschecked: !this.state.dealschecked }); }}
                                                        checked={this.state.dealschecked}
                                                        className="react-switch"
                                                        id="normal-switch"
                                                        onColor="#416bad"
                                                        checkedIcon={false}
                                                        uncheckedIcon={false}
          />
                                                </Col>
                                            </Row>
                                            <p>

Sign up to receive daily emails for some
of the hottest, limited-time deals on the site.

                                            </p>
                                            <hr/>
                                        </Col>
                                    </li>
                                    <li className="preferences">
                                        <Col lg={12} sm={12}>
                                            <Row>
                                                <Col lg={6} sm={6}>
                                                    <p>

Liquidation deals

                                                    </p>
                                                </Col>
                                                <Col lg={6} sm={6}>
                                                    <Switch
                                                        onChange={() => { this.setState({ liquidationchecked: !this.state.liquidationchecked }); }}
                                                        checked={this.state.liquidationchecked}
                                                        className="react-switch"
                                                        id="normal-switch"
                                                        onColor="#416bad"
                                                        checkedIcon={false}
                                                        uncheckedIcon={false}
          />
                                                </Col>
                                            </Row>
                                            <p>

Sign up to receive emails about our last-chance liquidation deals.

                                            </p>
                                            <hr/>
                                        </Col>
                                    </li>
                                    <li className="preferences">
                                        <Col lg={12} sm={12}>
                                            <Row>
                                                <Col lg={6} sm={6}>
                                                    <p>

Direct mail

                                                    </p>
                                                </Col>
                                                <Col lg={6} sm={6}>
                                                    <Switch
                                                        onChange={() => { this.setState({ directmailchecked: !this.state.directmailchecked }); }}
                                                        checked={this.state.directmailchecked}
                                                        className="react-switch"
                                                        id="normal-switch"
                                                        onColor="#416bad"
                                                        checkedIcon={false}
                                                        uncheckedIcon={false}
          />
                                                </Col>
                                            </Row>
                                            <p>

We occasionally send exclusive offers by mail with even greater savings to select customers. Everyone does not receive the same offer. You will automatically be eligible to receive these great offers as a member of the Overstock family.

                                            </p>
                                            <hr/>
                                        </Col>
                                    </li>
                                    <li className="preferences">
                                        <Col lg={12} sm={12}>
                                            <Row>
                                                <Col lg={6} sm={6}>
                                                    <p>

Unsubscribe from all emails

                                                    </p>

                                                </Col>
                                                <Col lg={6} sm={6}>
                                                    <Switch
                                                        onChange={() => { this.setState({ unsubscribechecked: !this.state.unsubscribechecked }); }}
                                                        checked={this.state.unsubscribechecked}
                                                        className="react-switch"
                                                        id="normal-switch"
                                                        onColor="#416bad"
                                                        checkedIcon={false}
                                                        uncheckedIcon={false}
                                                />
                                                </Col>
                                            </Row>
                                            <hr/>
                                        </Col>
                                    </li>
                                </Row>
                            </ul>
                        </Row>
                    </Col>
                </Row>

                <div className="formBtnWrap">
                    <button
                        className="formBtnComProfile saveBtnComProfile"
                        type="submit"
                        disabled={!this.state.isFocused}>
                        {saveCh ? 'Changes Saved Successfully!!'
                         : 'Save Changes'}
                    </button>
                    <a className="removeProfileButton" onClick={this.removeProfile.bind(this)}> remove my profile </a>
                </div>

            </form>
        </div>
    </div>
);
}
}

export default reduxForm({
form: 'login',
validate,
})(MyProfile);
