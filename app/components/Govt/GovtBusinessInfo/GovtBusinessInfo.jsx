import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Row, Col, ControlLabel } from 'react-bootstrap';
import './GovtBusinessInfo.scss';
import { connect } from 'react-redux';
import floatingLabelField from '../../FloatingLabel/FloatingLabel';
import { required } from '../../../common/Utils';
import MultiSelectDropdown from '../../MultiSelectDropdown/MultiSelectDropdown';
import * as ProfessionalAction from '../../../actions/ProfessionalAction';
import FileUploadComponent from '../../FileUpload/FileUpload';

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

export class govtBusinessInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            BusinessCategoryHasValue: false,
            BusinessCategoryHasUpload: false,
            BusinessOtherCategory: false,
            defaultCategorys: [],
            // defaultCategorysIsEmpty: false,
        };
    }

    componentWillMount() {
        const { actions, signUpDetails: { id } } = this.props;
        if (id) {
             actions.getSignupCustomerById(id);
        }
    }

    componentDidMount() {
        setTimeout(() => {
            const { initialValues } = this.props;
            const defaultValue = initialValues ? initialValues.categorys : null;
            this.setState({
                defaultCategorys: defaultValue,
                // defaultCategorysIsEmpty: true,
            });

            console.log('defaultValuedefaultValue', defaultValue);
        }, 1000);
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
        const { handleSubmit, submitting, categorysList } = this.props;
        // defaultCategoryList = ["Health Care", "Local Government"];
        const { BusinessCategoryHasValue, BusinessCategoryHasUpload, BusinessOtherCategory, defaultCategorys } = this.state;


        return (
            <div className="formOutterWrap">
                <Row>
                    <Col lg={12} sm={12}>
                        <p className="formTextTitle">Tell us about your organization </p>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12} sm={12} >
                        <form
                            onSubmit={handleSubmit}
                            className="Com-form-style">
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
                                        // disabled="disabled"
                                        label="Email*"
                                        component={floatingLabelField}
                                        validate={required} />
                                </li>
                                <li>
                                    <Field
                                        name="categorys"
                                        className="categorys"
                                        component={MultiSelectDropdown}
                                        optionList={categorysList}
                                        defaultValue={defaultCategorys}
                                        emptyOrNot={BusinessCategoryHasValue}
                                        onChangeMethod={this.BusinessCategoryOnChange}
                                        label="Organization Category (optional)"/>
                                </li>
                                {BusinessOtherCategory
                                        ? (
                                            <li>
                                                <Field
                                                    name="OtherCategory"
                                                    type="text"
                                                    label="Other Category*"
                                                    component={floatingLabelField}
                                                    validate={required} />
                                            </li>
                                            ) : ''}
                                <li>
                                    <Field
                                        name="agencyName"
                                        type="text"
                                        label="Agency Name"
                                        component={floatingLabelField}/>
                                </li>
                                <li>
                                    <Field
                                        name="isNonProfitOrg"
                                        type="checkbox"
                                        component={checkBoxField}
                                        label="I am a non-profit 501(c) organization"/>
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
                    </Col>
                </Row>
            </div>
        );
    }
}

govtBusinessInfo.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    change: PropTypes.func,
    categorysList: PropTypes.array,
};

const GovtBusinessPage = reduxForm({
    form: 'Govt', // a unique identifier for this form
    validate,
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(govtBusinessInfo);


const mapStateToProps = state => ({
    signUpDetails: state.signUp.signUpDetails ? state.signUp.signUpDetails : {},
    initialValues: state.professional && state.professional.companyInfoInitValues
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(
        ProfessionalAction
    ), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GovtBusinessPage);
