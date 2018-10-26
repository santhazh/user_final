import React, { Component } from 'react';
import {
    ControlLabel, Col, Row
} from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import floatingLabelField from '../../../FloatingLabel/FloatingLabel';
import Documents from '../DocumentsPopUp/Documents';
import './CompanyProfile.scss';
import DeactivateComAccount from '../DeactivateComAccount/DeactivateComAccount';
import RemoveCompanyFile from '../RemoveCompanyFile/RemoveCompanyFile';
import { validateEmail, normalizeZip } from '../../../../common/Utils';

export const positiveValue = value => (
    value && value <= 0 ? 'Must be positive values' : undefined);

export const validate = values => {
    const error = {};
    const emailError = validateEmail(values);
    if (emailError) {
        error.emailId = emailError;
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
/* eslint-disable react/prop-types */
// export const FieldFileInput = ({
//      input: { onChange }, meta: { touched, error },
// }) => (
//     <div className="file">
//         <input
//             type="file"
//             id="file-input"
//             accept=".jpg, .png, .jpeg, .pdf, .txt"
//             onChange={this.onChange} />
//         <ControlLabel htmlFor="file-input">Change</ControlLabel>
//         {touched && ((error
//                 && (<span className="error_text">{error}</span>)))}
//     </div>
// );

// export const AddFile = ({
//     input: { onChange }, meta: { touched, error },
// }) => (
//     <div className="file">
//         <input
//             type="file"
//             id="file-input"
//             accept=".jpg, .png, .jpeg, .pdf, .txt"
//             onChange={e => onChange(e.target.files[0])} />
//         <ControlLabel htmlFor="file-input">Add File</ControlLabel>
//         {touched && ((error
//                 && (<span className="error_text">{error}</span>)))}
//     </div>
// );
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
    class FileUploadInput extends Component {
        constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        }

        onChange(e) {
        const { input: { onChange } } = this.props;
        onChange(e.target.files[0]);
        }

        render() {
        const { input, label } = this.props;
         // whatever props you send to the component from redux-form Field

        return (
            <div>
                <ControlLabel>{label}</ControlLabel>
                <div className="file fileSpace">
                    <input
                        type="file"
                        id="file-input"
                        accept=".pdf, .txt"
                        onChange={this.onChange}
        />

                </div>
            </div>
        );
        }
        }

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

    class CompanyProfile extends Component {
        constructor(props) {
            super(props);
            this.state = {
                property: props,
                // companyEmail: '',
                // ein: '',
                // einLoaded: false,
                isFocused: false,
                saveCh: false,
                isModalAppear: false,
                previewTrue: false,
                deactivateAcc: false,
                RemoveComFileIcon: false,
                            };
        }

        componentDidMount() {
            // const companyName1 = Data.companyName;
            // const companyEmail1 = Data.companyEmail;
            // const ein1 = Data.ein;
         // this.props.initialize({
            //     comName: companyName1,
            //     emailId: companyEmail1,
            //     profileEin: ein1,
            // });

            axios.get('../../../../data.json')
            .then(res => {
                const companyName1 = res.data && res.data.companyName;
                const companyEmail1 = res.data && res.data.companyEmail;
                const ein1 = res.data && res.data.ein;
                // this.setState({
                //     companyName: companyName1,
                //     companyEmail: companyEmail1,
                //     ein: ein1
                // });

                this.props.initialize({
                    comName: companyName1,
                    emailId: companyEmail1,
                    profileEin: ein1,
                });
            });
        }

        changeButton = () => {
            this.setState({
                isFocused: true,
                saveCh: false,
            });
        };

        saveChanges = () => {
            this.setState({
                saveCh: true,
            });
        };

        closeModel = () => {
            // console.log('clicked');
            this.setState({
                deactivateAcc: false,
                isModalAppear: false,
            });
        }

        closeModelAcc = () => {
            console.log('clicked');
            this.setState({
                deactivateAcc: false,
            });
        }

        closeModelRemoveFile = () => {
            console.log('clicked');
            this.setState({

                RemoveComFileIcon: false,
            });
        }

        handlePdfFunction = () => {
            const { previewTrue } = this.state;
            this.setState({ previewTrue: true });
            if (previewTrue) {
                this.setState({ isModalAppear: true });
            }
        };

        deactivateAccount = () => {
            // const { deactivateAcc } = this.state;
            this.setState({ deactivateAcc: true });
        };

        RemoveComFile = () => {
            // const { RemoveComFileIcon } = this.state;
            this.setState({ RemoveComFileIcon: true });
        };

        render() {
        const { property, saveCh, isModalAppear, previewTrue, deactivateAcc, RemoveComFileIcon, isFocused } = this.state;

        const { handleSubmit } = property;

    return (
        <div>
            { isModalAppear
                ? (
                    <div >
                        <Documents
                            show={isModalAppear}
                            onHide={this.closeModel}
                        />
                    </div>
            ) : null }
            { deactivateAcc
                ? (
                    <DeactivateComAccount
                        show={deactivateAcc}
                        onHide={this.closeModelAcc}
                    />
            ) : null }
            { RemoveComFileIcon
                ? (
                    <RemoveCompanyFile
                        show={RemoveComFileIcon}
                        onHide={this.closeModelRemoveFile}
                    />
            ) : null }
            <div className="myProfileFormWrap">
                <Row>
                    <Col lg={12} sm={12}>
                        <p className="HeaderTxt_ComBu">

Welcome Company OSTK, manage your company profile here

                        </p>
                    </Col>
                </Row>
                <form onSubmit={handleSubmit(this.saveChanges)} className="formListWrap companyDetailsWrap" onFocus={this.changeButton}>

                    <div className="companyProfileInnerTxtWrap">
                        <Row className="myProfileLeftContentWrap">
                            <Col lg={8} sm={12} >
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
                            </Col>
                        </Row>
                        <Col lg={4} md={4} >
                            <ul className="companyProfileInnerLeftTxtWrap">
                                <li>
                                    <Field
                                        name="comName"
                                        type="text"
                                        label="Company name"
                                        component={floatingLabelField}
                                 />
                                </li>
                                <li>
                                    <Field
                                        name="emailId"
                                        type="text"
                                        label="Company email"
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
                                        name="profileAddress"
                                        type="text"
                                        label="Street address"
                                        component={floatingLabelField}
                                 />
                                </li>
                                <li>
                                    <Field
                                        name="profileCity"
                                        type="text"
                                        label="City"
                                        component={floatingLabelField}
                                 />
                                </li>
                                <Row>
                                    <Col lg={6} sm={6} >
                                        <li>
                                            <Field
                                                name="profileState"
                                                type="text"
                                                label="State"
                                                component={floatingLabelField}
                                 />
                                        </li>
                                    </Col>
                                    <Col lg={6} sm={6} >
                                        <li>
                                            <Field name="Zip" type="text" component={floatingLabelField} label="Zip" normalize={normalizeZip}/>
                                        </li>
                                    </Col>
                                </Row>


                            </ul>
                        </Col>
                        <Col lg={4} md={4} className="preferences">
                            <div className="companyProfileInnerLeftTxtWrap">
                                <ul>


                                    <li className="einField">
                                        <Col>
                                            <Field
                                                name="profileEin"
                                                type="text"
                                                label="EIN"
                                                component={floatingLabelField}
                                                disabled="true"
                                            />
                                        </Col>
                                    </li>
                                    <li className="preferences">
                                        <Col>

                                            <b>

Documents:

                                            </b>
                                            {' '}
Resale certificate, Business License.
Professional license or permit, State tax exemption,
Membership document


                                        </Col>
                                    </li>
                                    <li className="preferences ">
                                        <Col className="reSaleCertification">
                                            <Row>
                                                <Col lg={8} md={5}>
                                                    <div className="fileUpload" onClick={this.handlePdfFunction.bind(this)}>
                                                        {previewTrue ? 'Preview' : 'Sample.pdf'}
                                                    </div>
                                                </Col>

                                                <Col lg={1} md={1}>
                                                    <div>
                                                        <a
                                                            href="../../../../../samplepdf.pdf"
                                                            className="fa fa-download download"
                                                            download />
                                                    </div>
                                                </Col>
                                                <Col lg={2} md={2}>
                                                    <div onClick={this.RemoveComFile.bind(this)}>
                                                        <i className="fa
                                                         fa-times-circle" />
                                                    </div>
                                                </Col>


                                            </Row>
                                        </Col>
                                    </li>
                                    <li className="preferences">
                                        <Col>
                                            <Row>
                                                <Col>

                                                    <div className="uploadBtnWrapper">
                                                        <button className="fileUploadButton" type="submit"> Add File </button>
                                                        <Field
                                                            name="uploadFile"
                                                            component={FileUploadInput}
                                                            />
                                                    </div>

                                                </Col>

                                            </Row>


                                        </Col>
                                    </li>

                                </ul>
                            </div>
                        </Col>
                    </div>
                    <div className="formBtnWrap">
                        <button
                            className="formBtnComProfile saveBtnComProfile"
                            type="submit"
                            disabled={!isFocused}>
                            {saveCh ? 'Changes Saved Successfully!!'
                             : 'Save Changes'}
                            <div className="deactivateAccount" onClick={this.deactivateAccount.bind(this)}>
                                     deactivate company account
                            </div>
                        </button>
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
})(CompanyProfile);
