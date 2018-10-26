import React from 'react';
// import { Grid, Row, Col } from 'react-bootstrap';
import {
    Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MyProfile from '../AccountDetails/MyProfile/MyProfile';
import CompanyProfile from '../AccountDetails/CompanyProfile/CompanyProfile';
import Activity from '../AccountDetails/Activity/Activity';
import './AccountTabs.scss';
import * as MyProfileAction from '../../../actions/MyProfileAction';

/* eslint-disable react/prop-types */
class AccountTabs extends React.Component {
  componentWillMount() {
         const { actions } = this.props;
         actions.MyProfileRequest();
  }

    render() {
    const { location: { pathname }, userDetailsData } = this.props;

return (
    <div className="DashboardRightSideWrap">
        <Tabs className="TabOutterWrap">
            <TabList className="TabHeaderWrap">
                <Tab className="TabHeaderTitle">
                    <span>
                        My Profile
                    </span>
                </Tab>
                {userDetailsData.role === 'Admin' ? (
                    <Tab className="TabHeaderTitle">
                        <span>
                        Company Profile
                        </span>
                    </Tab>
                ) : null}
                <Tab className="TabHeaderTitle">
                    <span>
                        Activity
                    </span>
                </Tab>
            </TabList>
            <div className="TabContentWrap">
                <TabPanel>
                    { pathname && pathname === '/dashboard/accountabs' && <MyProfile />}
                </TabPanel>
                {userDetailsData.role === 'Admin' ? (
                    <TabPanel>
                        <CompanyProfile />
                    </TabPanel>
                ) : null}
                <TabPanel>
                    <Activity />
                </TabPanel>
            </div>
        </Tabs>
    </div>
    );
}
}

// SignupPage.propTypes = {
//     location: PropTypes.string.isRequired,
// };

const mapStateToProps = state => ({
    userDetailsData: state.myProfile.UserDetails ? state.myProfile.UserDetails : []
    });

const mapDispatchToProps = dispatch => ({
        actions: bindActionCreators(Object.assign(MyProfileAction), dispatch),
    });

export default connect(mapStateToProps, mapDispatchToProps)(AccountTabs);
