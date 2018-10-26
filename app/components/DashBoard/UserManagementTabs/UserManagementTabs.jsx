import React from 'react';
import PropTypes from 'prop-types';
import {
    Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Members from '../UserManagementDetails/Members/Members';
// import Admins from '../UserManagementDetails/Admins/Admins';
// import Contributors from '../UserManagementDetails/Contributors/Contributors';
import MemberPermission from '../UserManagementDetails/MemberPermission/MemberPermission';
import GroupManagement from '../UserManagementDetails/GroupManagement/GroupManagement';
import './UserManagementTabs.scss';
import AddUserPopup from '../../Model/AddUser';
import floatingLabelField from '../../FloatingLabel/FloatingLabel';
import { required } from '../../../common/Utils';
// import userListJson from '../../../json/UserList.json';
import * as UserManagementAction from '../../../actions/UserManagementAction';


class userManagementTabs extends React.Component {
    constructor(props) {
        super(props);
        this.child = React.createRef(Members);
        this.state = ({ isModalAddUsersAppear: false, newUserObject: {}, membersList: [], adminUsers: [], contributorUsers: [], userFullName: '' });
    }

    componentWillMount = () => {
        const { actions, userDetailsData } = this.props;
        actions.userManagementMembersListRequest();
        setTimeout(() => {
            this.categorizeUsers();
        }, 500);
    }

    componentWillReceiveProps = nextProps => {
        const userDetailsData = nextProps.userDetailsData;

        if (nextProps.userDetailsData) {
            debugger;
            this.categorizeUsers(nextProps.userDetailsData);
        }
    }

   closeModel = () => {
        this.setState({ isModalAddUsersAppear: false });
    }

    newUserDetailsCallBack = newUserDetailsObj => {
        this.setState({ newUserObject: newUserDetailsObj });
        }

    addUserDetailsCallBack = props => {
        const { actions, userDetailsData } = this.props;
        debugger;
        actions.userManagementMembersListRequest();
    }

    openAddUserPopup = () => {
        const userName = document.getElementsByName('comName')[0].value;
        this.setState({ userFullName: userName });
        this.setState({ isModalAddUsersAppear: true });
    }

    categorizeUsers = prop => {
        const membersList = prop;
        const adminArr = [];
        const contributorArr = [];

        for (let i = 0; i < membersList.length; i++) {
            if (membersList[i].roleType === 'Admin') {
                adminArr.push(membersList[i]);
            } else {
                contributorArr.push(membersList[i]);
            }
        }

        this.setState({
            membersList,
            adminUsers: adminArr,
            contributorUsers: contributorArr
        });
    }

render() {
    const { handleSubmit, location: { pathname } } = this.props;
    const { isModalAddUsersAppear, newUserObject, membersList, adminUsers, contributorUsers, userFullName } = this.state;

return (
    <div className="DashboardRightSideWrap">
        <Tabs className="TabOutterWrap">
            <TabList className="TabHeaderWrap">
                <Tab className="TabHeaderTitle">
                    <span>
                            Members&nbsp;
                        {membersList.length}
                    </span>
                </Tab>
                <Tab className="TabHeaderTitle">
                    <span>
                            Admins&nbsp;
                        {adminUsers.length}
                    </span>
                </Tab>
                <Tab className="TabHeaderTitle">
                    <span>
                                Contributors&nbsp;
                        {contributorUsers.length}
                    </span>
                </Tab>
                <Tab className="TabHeaderTitle">
                    <span>
                                Groups
                    </span>
                </Tab>
                <Tab className="TabHeaderTitle">
                    <span>
                            Member Permissions
                    </span>
                </Tab>

                <div className="addUser">
                    <form onSubmit={handleSubmit} className="Com-form-style">
                        <Field
                            name="comName"
                            type="text"
                            label="Enter an email"
                            component={floatingLabelField}
                            validate={required} />
                    </form>
                    <span className="UserManagementAddUserBtn">
                        <input type="button" value="Add New User" className="formBtn" onClick={this.openAddUserPopup}/>
                    </span>
                </div>
            </TabList>
            <div className="TabContentWrap">
                <TabPanel>
                    { pathname && pathname === '/dashboard/user-management' && <Members addUserDetails={newUserObject} membersList={membersList} />}
                </TabPanel>
                <TabPanel>
                    <Members addUserDetails={newUserObject} membersList={adminUsers}/>
                </TabPanel>
                <TabPanel>
                    <Members addUserDetails={newUserObject} membersList={contributorUsers}/>
                </TabPanel>
                <TabPanel>
                    <GroupManagement />
                </TabPanel>
                <TabPanel>
                    <MemberPermission />
                </TabPanel>
            </div>
        </Tabs>
        <div>
            {isModalAddUsersAppear
            && (
            <AddUserPopup
                show={isModalAddUsersAppear}
                onHide={this.closeModel}
                userName={userFullName}
                setNewUserDetails={this.newUserDetailsCallBack}
                addUserCallBackFunction={this.addUserDetailsCallBack} />
)}
        </div>
    </div>
    );
}
}

userManagementTabs.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    location: PropTypes.object,
};

const selector = formValueSelector('ProfessionalForm');

const mapStateToProps = state => ({
    emailId: selector(state, 'emailId'),
    userDetailsData: state.userManagement.userListResponse
});

const mapDispatchToProps = dispatch => ({
        actions: bindActionCreators(Object.assign(UserManagementAction), dispatch),
    });

const userManagementTabsForm = reduxForm({
    form: 'ProfessionalForm', // a unique identifier for this form
     destroyOnUnmount: false,
     forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    })(userManagementTabs);

export default connect(mapStateToProps, mapDispatchToProps)(userManagementTabsForm);
