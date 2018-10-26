import React, { Component } from 'react';
import {
    ControlLabel, Col,
} from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import './ProfessionalInfo.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import floatingLabelField from '../../FloatingLabel/FloatingLabel';
import { required } from '../../../common/Utils';
import MultiSelectDropdown from '../../MultiSelectDropdown/MultiSelectDropdown';
import FileUploadComponent from '../../FileUpload/FileUpload';
import * as ProfessionalAction from '../../../actions/ProfessionalAction';

export const validate = values => {
    const error = {};
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailPasswordPattern = /^[a-zA-Z0-9]{8,16}$/g;
    const validEmail = emailPattern.test(values.email);
    // eslint-disable-next-line
    const validPwd = emailPasswordPattern.test(values.password);
    if (!values.email) {
        error.email = 'Required';
    } else if (!validEmail) {
        error.email = 'Please Enter a Valid Email';
    }

return error;
};

/* eslint-disable react/prop-types */
export const checkBoxField = ({
    label, type, input,
  }) => (
      <div className="form-group">
          <ControlLabel>
              <input
                  {...input}
                  type={type}
                  className="checkBoxStyle" />
              {label}
          </ControlLabel>
      </div>);

export class ProfessionalInfo extends Component {
    constructor() {
        super();
        this.state = {
            BusinessCategoryHasValue: false,
            BusinessCategoryHasUpload: false,
            BusinessOtherCategory: false,
        };
    }

    componentWillMount() {
        const { actions, signUpDetails: { id } } = this.props;
        // console.log('id', id);
        if (id) {
             actions.getSignupCustomerById(id);
        }
    }

    BusinessCategoryOnChange = (e, { value }) => {
        const { change } = this.props;
        if (value === undefined || value.length === 0) {
            this.setState({
                BusinessCategoryHasValue: false,
            });
        } else {
            change('categorys', value);
            this.setState({
                BusinessCategoryHasValue: true,
            });
        }
        if (value.indexOf('Contractor') > -1 || value.indexOf('Real estate agent') > -1) {
            this.setState({
                BusinessCategoryHasUpload: true,
            });
        } else {
            this.setState({
                BusinessCategoryHasUpload: false,
            });
        }
        if (value.indexOf('Other') > -1) {
            this.setState({
                BusinessOtherCategory: true,
            });
        } else {
            this.setState({
                BusinessOtherCategory: false,
            });
        }
    };

    render() {
        const {
            handleSubmit, submitting, businessCategorys, initialValues,
        } = this.props;
        const { BusinessCategoryHasValue, BusinessCategoryHasUpload, BusinessOtherCategory } = this.state;

        return (
            <div>
                <div className="HeaderTxtWrap">
                    <Col lg={12} sm={12}>
                        <p className="HeaderTxt_ComBusiness">
                            <b>
                                Select the option that best describes your business
                            </b>
                        </p>
                    </Col>
                </div>
                <div className="formOutterWrap">
                    <form onSubmit={handleSubmit} className="Com-form-style">
                        <ul className="formListWrap">
                            <li>
                                <Field
                                    name="fullName"
                                    type="text"
                                    label="Your Full Name*"
                                    component={floatingLabelField}
                                    validate={required} />
                            </li>
                            <li>
                                <Field
                                    name="email"
                                    type="text"
                                    label="Email*"
                                    component={floatingLabelField}
                                    validate={required} />
                            </li>
                            <li>
                                <Field
                                    name="nameOfBusiness"
                                    type="text"
                                    label="Name of Business*"
                                    component={floatingLabelField}
                                    validate={required} />
                            </li>
                            <li>
                                <Field
                                    name="categorys"
                                    className="categorys"
                                    validate={required}
                                    component={MultiSelectDropdown}
                                    defaultValue={(initialValues && initialValues.categorys) || []}
                                    optionList={businessCategorys}
                                    emptyOrNot={BusinessCategoryHasValue}
                                    onChangeMethod={this.BusinessCategoryOnChange}
                                    label="Business Category*"/>
                            </li>
                            {BusinessOtherCategory
                                    ? (
                                        <li>
                                            <Field
                                                name="otherCategory"
                                                type="text"
                                                label="Other Category*"
                                                component={floatingLabelField}
                                                validate={required} />
                                        </li>
                                        ) : ''}
                            <li>
                                <Field
                                    name="ein"
                                    type="text"
                                    label="EIN*"
                                    component={floatingLabelField}
                                    validate={required} />
                            </li>
                            <li>
                                <Field
                                    name="webAddress"
                                    type="text"
                                    label="Web Address"
                                    component={floatingLabelField} />
                            </li>
                            <li>
                                <Field
                                    name="isNonProfitOrg"
                                    type="checkbox"
                                    component={checkBoxField}
                                    label="I am a non-profit 501(c) organization"/>
                                <Field
                                    name="isReseller"
                                    type="checkbox"
                                    component={checkBoxField}
                                    label="I am a reseller"/>
                            </li>
                        </ul>
                        {BusinessCategoryHasUpload ? <FileUploadComponent /> : null}

                        <div className="formBtnWrap">
                            <button
                                className="formBtn"
                                type="submit"
                                disabled={submitting}>
                                Next
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

ProfessionalInfo.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    change: PropTypes.func,
    businessCategorys: PropTypes.array,
};

const ProfessionalInfoForm = reduxForm({
    form: 'ProfessionalForm', // a unique identifier for this form
    validate,
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(ProfessionalInfo);

const mapStateToProps = state => ({
    signUpDetails: state.signUp.signUpDetails ? state.signUp.signUpDetails : {},
    initialValues: state.professional && state.professional.companyInfoInitValues
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(
        ProfessionalAction
    ), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalInfoForm);
