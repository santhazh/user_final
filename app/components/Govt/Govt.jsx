import React from 'react';
import Stepper from 'react-stepper-horizontal';
import { Row, Col, Grid } from 'react-bootstrap';
import './GovtStyle.scss';
import { bindActionCreators } from 'redux';
import _map from 'lodash/map';
import _find from 'lodash/find';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GovtBusinessInfo from './GovtBusinessInfo/GovtBusinessInfo';
import ShoppingPreference from '../ShoppingPreference/ShoppingPreference';
import { SHOPPING_CATEGORIES } from '../../common/Constants';
import * as govtAction from '../../actions/GovtAction';
import * as professionalAction from '../../actions/ProfessionalAction';
import * as SignUpAction from '../../actions/SignUpAction';
import history from '../../history';

const stages = [{ title: 'Organization Information', id: 1 }, { title: 'Shopping Options', id: 2 }];
class Govt extends React.Component {
    componentWillMount() {
        const { actions } = this.props;
        actions.getSignUpDetails();
        actions.getGovtCategorys();
    }

  nextPage = values => {
    const { actions, currentStageIndex, signUpDetails, govtcategorysList } = this.props;
    const submitValue = {};
    values.documentProof = [];
    submitValue.id = signUpDetails.id;
    submitValue.emailId = signUpDetails.emailId;
    submitValue.b2cCustomerId = signUpDetails.b2cCustomerId;
    if (currentStageIndex === 1) {
        values.isProfessional = false;
        submitValue.fullName = values.fullName;
        const listItems = [];
        _map(values.categorys, obj => {
            const currentCategory = _find(govtcategorysList, { categoryName: obj }, {});
            listItems.push({ id: currentCategory.id, categoryName: currentCategory.categoryName });
          });
        values.categories = listItems;
        values.nameOfBusiness = 'gov';
        submitValue.companyInfo = values;
        submitValue.isSignupDone = false;
        submitValue.signupStage = currentStageIndex + 1;
        if (values.uploadFile) {
            actions.uploadFileCompanyInfo(submitValue);
        } else {
            actions.createCompanyInfo(submitValue);
        }
    }
  }

  previousPage = () => {
    const { actions, currentStageIndex } = this.props;
    actions.decrementStage(currentStageIndex);
  }

  onSubmit = values => {
    const { actions, currentStageIndex, signUpDetails } = this.props;
    const submitValue = {};
    submitValue.id = signUpDetails.id;
    submitValue.emailId = signUpDetails.emailId;
    submitValue.b2cCustomerId = signUpDetails.b2cCustomerId;
    submitValue.signupStage = currentStageIndex + 1;
    submitValue.isSignupDone = true;
    const shoppingPreferenceList = values.shoppingPreference;
    submitValue.shoppingPreference = { shoppingPreferenceList };
    actions.createShoppingPreferences(submitValue);
}

  closeModel = () => {
      history.push('./home');
  }

  render() {
    const { currentStageIndex, govtcategorysList } = this.props;
    const currentStage = _find(stages, { id: currentStageIndex });

return (
    <Grid fluid >
        <Row className="insideHeaderWrap" >
            <Col lg={3} md={4} sm={4} />
            <Col lg={6} md={8} sm={8} className="stepProgressWrap" >
                <Stepper
                    steps={stages}
                    activeStep={currentStage.id - 1}
                    activeColor="#000"
                    completeColor="#000"
                    circleFontColor="transparent" />
            </Col>
        </Row>
        <div className="container">
            {currentStage.id === 1
                  && (
                      <GovtBusinessInfo
                          categorysList={govtcategorysList}
                          onSubmit={this.nextPage}/>
            )}
            {currentStage.id === 2
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

Govt.propTypes = {
    actions: PropTypes.object,
    currentStageIndex: PropTypes.number,
    signUpDetails: PropTypes.object,
    govtcategorysList: PropTypes.array,
};

const mapStateToProps = state => ({
    signUpDetails: state.signUp.signUpDetails ? state.signUp.signUpDetails : {},
    currentStageIndex: state.professional.stageIndex ? state.professional.stageIndex : 1,
    govtcategorysList: state.govt.categorys ? state.govt.categorys : [],
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(
        govtAction, professionalAction, SignUpAction
    ), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Govt);
