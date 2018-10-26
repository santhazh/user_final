import React from 'react';
import Stepper from 'react-stepper-horizontal';
// import Cookies from 'js-cookie';
import { Row, Col, Grid } from 'react-bootstrap';
import './Professional.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _find from 'lodash/find';
import _map from 'lodash/map';
import PropTypes from 'prop-types';
import ProfessionalInfo from './ProfessionalInfo/ProfessionalInfo';
import QuickVerify from './Quickverify/Quickverify';
import { SHOPPING_CATEGORIES } from '../../common/Constants';
import ShoppingPreference from '../ShoppingPreference/ShoppingPreference';
import * as SignUpAction from '../../actions/SignUpAction';
import history from '../../history';
import * as ProfessionalAction from '../../actions/ProfessionalAction';

const stages = [{ title: 'Business Information', id: 1 }, { title: 'Quick Verify', id: 2 }, { title: 'Shopping Options', id: 3 }];
class Professional extends React.Component {
    constructor() {
        super();
        this.state = {
            businessType: 'Corporation'
        };
    }

    componentWillMount() {
        const { actions } = this.props;
        actions.getSignUpDetails();
        actions.getBusinessCategorys();
    }

    nextPage = values => {
        const { actions, currentStageIndex, signUpDetails, bussinessCategorysList } = this.props;
        const submitValue = {};
        values.documentProof = [];
        submitValue.id = signUpDetails.id;
        submitValue.emailId = signUpDetails.emailId;
        submitValue.b2cCustomerId = signUpDetails.b2cCustomerId;

        if (currentStageIndex === 1) {
            values.isProfessional = true;
            submitValue.fullName = values.fullName;
            const listItems = [];
            _map(values.categorys, obj => {
              const currentCategory = _find(bussinessCategorysList, { categoryName: obj }, {});
              if (currentCategory.id !== 24) {
                listItems.push({ id: currentCategory.id, categoryName: currentCategory.categoryName });
              }
            });
            if (values.otherCategory) {
                listItems.push({ categoryName: values.otherCategory });
            }
            values.categories = listItems;
            submitValue.companyInfo = values;
            submitValue.isSignupDone = false;
            submitValue.signupStage = 2;
            if (values.uploadFile) {
                actions.uploadFileCompanyInfo(submitValue);
            } else {
                actions.createCompanyInfo(submitValue);
            }
        } else if (currentStageIndex === 2) {
            if (values.cardNumber) {
                const creditCardDetail = {};
                creditCardDetail.nameOnCard = values.nameOnCard;
                creditCardDetail.cardNumber = values.cardNumber;
                const expiryDateValue = `${values.expirationMonth}/${values.expirationYear}`;
                creditCardDetail.expiryDate = expiryDateValue;
                creditCardDetail.cvv = values.cvv;
                submitValue.creditCard = [creditCardDetail];
            }
            if (values.address) {
                const creditCardDetail = {};
                creditCardDetail.nameOnCard = values.nameOnCard;
                creditCardDetail.cardNumber = values.cardNumber;
                const expiryDateValue = `${values.expirationMonth}/${values.expirationYear}`;
                creditCardDetail.expiryDate = expiryDateValue;
                creditCardDetail.cvv = values.cvv;
                submitValue.creditCard = [creditCardDetail];
            }

            submitValue.signupStage = 3;
            submitValue.isSignupDone = false;
            actions.createCardDetails(submitValue);
        }
    }

    previousPage = () => {
        const { actions, currentStageIndex } = this.props;
        actions.decrementStage(currentStageIndex);
    }

    onSubmit = values => {
        const { actions, signUpDetails } = this.props;
        const submitValue = {};
        submitValue.id = signUpDetails.id;
        submitValue.emailId = signUpDetails.emailId;
        submitValue.b2cCustomerId = signUpDetails.b2cCustomerId;
        submitValue.signupStage = 4;
        submitValue.isSignupDone = true;
        const shoppingPreferenceList = values.shoppingPreference;
        submitValue.shoppingPreference = { shoppingPreferenceList };
        actions.createShoppingPreferences(submitValue);
    }

      closeModel = () => {
          history.push('./home');
      }

      businessTypeChange = type => {
          this.setState({ businessType: type });
      }

      render() {
            const { businessType } = this.state;
            const { currentStageIndex, bussinessCategorysList } = this.props;
            const currentStage = _find(stages, { id: currentStageIndex });

return (
    <Grid fluid >
        <Row className="insideHeaderWrap" >
            <Col lg={3} md={4} sm={4} />
            <Col lg={6} md={8} sm={8} className="stepProgressWrap" >
                <Stepper
                    className="step-progress"
                    steps={stages}
                    activeStep={currentStage.id - 1}
                    activeColor="#000"
                    completeColor="#000"
                    defaultTitleColor="#000"
                    completeTitleOpacity="1"
                    circleFontColor="transparent" />
            </Col>
        </Row>
        <div>
            {currentStage.id === 1
            && (
                <ProfessionalInfo
                    businessCategorys={bussinessCategorysList}
                    onSubmit={this.nextPage}
                    onBusinessTypeChange={this.businessTypeChange}
                    businessType={businessType}/>
            )}
            {currentStage.id === 2
                         && (
                             <QuickVerify
                                 previousPage={this.previousPage}
                                 onSubmit={this.nextPage}/>
                         )}
            {currentStage.id === 3
                         && (
                             <ShoppingPreference
                                 shoppingCategoriesList={SHOPPING_CATEGORIES}
                                 previousPage={this.previousPage}
                                 onSubmit={this.onSubmit} />
                         )}
        </div>
    </Grid>
          );
      }
}

Professional.propTypes = {
    actions: PropTypes.object,
    currentStageIndex: PropTypes.number,
    signUpDetails: PropTypes.object,
    bussinessCategorysList: PropTypes.array,
};

const mapStateToProps = state => ({
    bussinessCategorysList: state.professional.categorys ? state.professional.categorys : [],
    signUpDetails: state.signUp.signUpDetails ? state.signUp.signUpDetails : {},
    companyInfoSuccess: state.professional.companyInfoSuccess ? state.professional.companyInfoSuccess : null,
    currentStageIndex: state.professional.stageIndex ? state.professional.stageIndex : 1,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(
        ProfessionalAction, SignUpAction
    ), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Professional);
