
import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { expect } from 'chai';
import PasswordResetLinkSendForm, {
    PasswordResetLinkSend, validate,
} from './PasswordResetLinkSend';

describe('Test suits for Send Email', () => {
    let component;
    let wrapperRedComp;
    beforeEach(() => {
        const mockStore = configureStore([]);
        const store = mockStore({
            signIn: {
                emailId: '',
            },
        });
        const handleSubmit = sinon.spy();
        const handleSubmitForm = sinon.spy();
        wrapperRedComp = shallow(<PasswordResetLinkSend
            handleSubmit={handleSubmit}
            handleSubmitForm={handleSubmitForm({})}/>);
        component = mount(
            <Provider store={store}>
                <PasswordResetLinkSendForm handleSubmit={handleSubmitForm}/>
            </Provider>,
        );
    });

    it('Check if the werapper component exist', () => {
        expect(wrapperRedComp).to.exist;
    });
    afterEach(() => {
        component.unmount();
    });

    // it('should show previously rolled value', () => {
    //     const initialValues = {
    //         login: {
    //             emailId: '',
    //         },
    //     };
    //     // Just call the method directly passing in sample data
    //     // to make sure it does what it's supposed to
    //     expect(mapStateToProps(initialValues).login.emailId).toEqual(undefined);
    // });

    it('inValid Email', () => {
        const aptError = validate({ emailId: '' });
        expect(aptError.emailId).to.equal('Required');
    });

    it('inValid Email', () => {
        const aptError = validate({ emailId: 'Overstock@' });
        expect(aptError.emailId).to.equal('Please Enter a Valid Email');
    });

    it('valid Email', () => {
        const aptError = validate({ emailId: 'Overstock@gmail.com' });
        expect(aptError.emailId).to.equal(undefined);
    });

    it('should render the component elements properly', () => {
        expect(wrapperRedComp.contains('loginBoxWrap')).to.exist;
    });

    // it('renders an error message for the input', () => {
    //     const input = { name: 'email' };
    //     const label = 'Email';
    //     const meta = { touched: true, error: 'Required' };
    //     const type = 'email';
    //     const placeholder = 'Email';
    //     const element = renderField({
    //         placeholder, label, type, input, meta,
    //     });
    //     shallow(element);
    // });

    it('should render the component items properly', () => {
        expect(wrapperRedComp.contains('Send Reset Link')).to.exist;
    });
    it('should render the component items properly', () => {
        expect(wrapperRedComp.contains('form-group')).to.exist;
    });
    it('should render the component items properly', () => {
        expect(wrapperRedComp.contains('loginBoxWrap')).to.exist;
    });

    it('should render the component items properly', () => {
        expect(wrapperRedComp.contains('Enter your email address and we will send you a link.')).to.exist;
    });
});
