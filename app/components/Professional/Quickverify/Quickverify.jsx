import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import './Quickverify.scss';
import _remove from 'lodash/remove';
import _map from 'lodash/map';
import _isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import floatingLabelField from '../../FloatingLabel/FloatingLabel';
import { validateYear, validateMonth } from '../../../common/Utils';

export const validate = values => {
    const errors = {};
    const fields = ['nameOnCard', 'cardNumber', 'expirationMonth', 'expirationYear', 'cvv', 'address', 'state', 'city', 'zip'];
    const enterFields = [];
    _map(fields, obj => {
        if (obj in values) {
            enterFields.push(obj);
        }
    });
    if (!_isEmpty(enterFields)) {
        _map(fields, obj => {
            if (!(obj in values)) {
                errors[obj] = 'Required';
            }
        });
        const yearError = validateYear(values);
        if (yearError) {
            errors.year = yearError;
        }

        const monthError = validateMonth(values);
        if (monthError) {
            errors.month = monthError;
        }
    }

    return errors;
};

export class QuickVerify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            property: props,
            isFocused: false,
        };
        this.formValues = [];
    }

    changeButton = eve => {
        if (eve.target.value) {
            this.formValues.push({ value: eve.target.value, name: eve.target.name });
        } else if (eve.target.value === '') {
            _remove(this.formValues, obj => {
                return (obj.name === eve.target.name);
            });
        }

        if (this.formValues.length) {
            this.setState({
                isFocused: true,
            });
        } else {
            this.setState({
                isFocused: false,
            });
        }
    };

    render() {
        const { property, isFocused } = this.state;
        const { handleSubmit, submitting, previousPage } = property;

return (
    <div className="QuickVerifyWrap">
        <div className="">
            <h3><b> Get Verified Quicker (Optional)</b></h3>
            <p>

Business Credit Card:If you have one,it helps us verify your account even faster.
                <b> Your card will not be charged.</b>
            </p>
        </div>
        <div className="QuickVerifyOutterWrap">
            <form onSubmit={handleSubmit} className="form-style" onChange={this.changeButton}>
                <Field
                    name="nameOnCard"
                    type="text"
                    label="Name on Card"
                    component={floatingLabelField} />
                <Field
                    name="cardNumber"
                    type="number"
                    label="Card Number"
                    component={floatingLabelField} />
                <Row>
                    <Col lg={4} sm={4} className="expmonth" >
                        <Field
                            name="expirationMonth"
                            type="number"
                            label="MM"
                            component={floatingLabelField}/>
                    </Col>
                    <Col lg={4} sm={4} >
                        <Field
                            name="expirationYear"
                            type="number"
                            component={floatingLabelField}
                            label="YYYY" />
                    </Col>
                    <Col lg={4} sm={4}>
                        <Field
                            name="cvv"
                            type="password"
                            component={floatingLabelField}
                            label="CVV" />
                    </Col>
                </Row>
                <Field name="address" type="text" component={floatingLabelField} label="Street Address" />
                <Row>
                    <Col lg={3} sm={3}>
                        <Field
                            name="state"
                            type="text"
                            component={floatingLabelField}
                            label="State" />
                    </Col>
                    <Col lg={5} sm={5}>
                        <Field
                            name="city"
                            component={floatingLabelField}
                            label="City" />
                    </Col>
                    <Col lg={4} sm={4} className="zip">
                        <Field
                            name="zip"
                            type="number"
                            component={floatingLabelField}
                            label="Zip"/>
                    </Col>
                </Row>
                <div className="formBtnWrap">
                    <button className="backBtn" type="submit" onClick={previousPage} >Back</button>
                    <button className="formBtn" type="submit" disabled={submitting}>{isFocused ? 'Next' : 'Skip for Now'}</button>
                </div>
            </form>
        </div>
    </div>
        );
    }
}

const quickVerify = reduxForm({
    form: 'ProfessionalForm',
    validate,
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(QuickVerify);

const mapStateToProps = state => ({
    initialValues: state.professional && state.professional.initValue
});


export default connect(mapStateToProps)(quickVerify);
