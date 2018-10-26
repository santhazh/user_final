import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './ShoppingPreference.scss';
import { SHOPPING_CATEGORIES } from '../../common/Constants';
import MultiSelectDropdown from '../MultiSelectDropdown/MultiSelectDropdown';

export class ShoppingPreference extends Component {
    constructor(props) {
        super(props);
        this.state = {
            BusinessCategoryHasValue: false,
        };
        this.searchValue;
    }


    shoppingCategoryOnChange = (e, { value }) => {
         const { change } = this.props;
        if (value === undefined || value.length === 0) {
            this.setState({
                BusinessCategoryHasValue: false,
            });
        } else {
            change('shoppingPreference', value);
            this.setState({
                BusinessCategoryHasValue: true,
            });
        }
    }

    render() {
        const { previousPage, handleSubmit } = this.props;
        const { BusinessCategoryHasValue } = this.state;

return (
    <div className="shopping-preference">
        <p className="formTextTitle">What type of products do you shop for? (Optional) </p>
        <form className="form-style" onSubmit={handleSubmit}>
            <div>
                <Field
                    name="shoppingPreference"
                    className="categorys"
                    component={MultiSelectDropdown}
                    optionList={SHOPPING_CATEGORIES}
                    onChangeMethod={this.shoppingCategoryOnChange}
                    emptyOrNot={BusinessCategoryHasValue}
                    label={BusinessCategoryHasValue ? 'Selected Items' : 'Suggested Products'}/>

                <div className="terms">
                            By clicking finish you agree to user
                    <a className="termsLink" href="https://help.overstock.com/help/s/article/TERMS-AND-CONDITIONS">
                        &nbsp;
Terms & Conditions

                    </a>
                </div>
                <div className="formBtnWrap">
                    <button className="backBtn" type="submit" onClick={previousPage}>Back</button>
                    <button
                        className="formBtn buttonOverrides"
                        type="submit">
                        {BusinessCategoryHasValue ? 'Finish' : 'Skip for Now & Finish'}
                    </button>
                </div>
            </div>
        </form>
    </div>
        );
    }
}

ShoppingPreference.propTypes = {
    previousPage: PropTypes.func,
    handleSubmit: PropTypes.func,
    change: PropTypes.func,
};

const ShoppingPreferenceForm = reduxForm({
    form: 'ShoppingPreference', // a unique identifier for this form
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(ShoppingPreference);

const mapStateToProps = state => ({
    initialValues: state.professional && state.professional.initValue
});

export default connect(mapStateToProps)(ShoppingPreferenceForm);
