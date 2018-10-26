import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import SignUpReduxForm, {
    validate, SignupForm,
} from './SignupForm';
import floatingLabelField from '../FloatingLabel/FloatingLabel';

describe('Test suits for <SignupForm />', () => {
    let component;
    let shallowWrapper;
    const handleSubmit = sinon.spy();
    // const handleSubmitMock = () => ({ email: 'test@test.com', password: 'password@123' });
    const onSubmitCall = sinon.spy();
    const recaptchaVerifyCallback = sinon.spy();
    const recaptchaOnLoadCallback = sinon.spy();
    const checkSignupEmailDomain = sinon.spy();
    const checkHasGovEmail = sinon.spy();
    const isEmailHasGovermentEmail = sinon.spy();
    const handlePasswrdChange = sinon.spy();
    const change = sinon.spy();
    const props = {
        actions:
        {
            recaptchaVerifyCallback, recaptchaOnLoadCallback, checkSignupEmailDomain, checkHasGovEmail, handlePasswrdChange, isEmailHasGovermentEmail,
        },
        change,
    };
    const mockStore = configureStore([]);
    const store = mockStore({
        signUp: {
            error: '',
            SignUpUser: {}
        }
    });
    beforeEach(() => {
        shallowWrapper = shallow(<SignupForm
            handleSubmit={handleSubmit}
            {...props}
            submitCase={onSubmitCall}
        />);
        component = mount(
            <Provider store={store}>
                <SignUpReduxForm
                    submitCase={handleSubmit} />
            </Provider>,
        );
        ['length', 'special', 'capital']
            .forEach(id => {
                const p = global.document.createElement('p');
                p.id = id;
                global.document.body.appendChild(p);
            });
    });
    afterEach(() => {
        component.unmount();
    });
    it('Check if the wrapper component exist', () => {
        expect(component).to.exist;
    });
    it('renders an error message for the input', () => {
        const input = { name: 'email' };
        const label = 'Email';
        const meta = { touched: true, error: 'Required' };
        const type = 'email';
        const element = floatingLabelField({
            label, type, input, meta,
        });
        mount(element);
    });

    it('inValid Email', () => {
        const aptError = validate({ emailId: '' });
        expect(aptError.emailId).to.equal('Required');
    });
    it('inValid Password', () => {
        const aptError = validate({ password: '' });
        expect(aptError.password).to.equal('Required');
    });
    it('inValid Email', () => {
        const aptError = validate({ emailId: 'Overstock@' });
        expect(aptError.emailId).to.equal('Please Enter a Valid Email');
    });
    it('Valid Email', () => {
        const aptError = validate({ emailId: 'Overstock@gmail.com' });
        expect(aptError.emailId).to.equal(undefined);
    });
    it('Valid password-test', () => {
        const aptError = validate({ password: 'Overstock!' });
        expect(aptError.password).to.equal(undefined);
    });
    it('Valid password-test 3', () => {
        const aptError = validate({ password: 'Overstock123!gmail' });
        expect(aptError.password).to.equal(undefined);
    });
    it('checkHasGovEmail should be invoked without values', () => {
        const change = sinon.spy();
        shallowWrapper.setProps({ change, SignUpUser: { emailId: 'Overstock@gmail.com' } });
        shallowWrapper.instance().checkHasGovEmail({ target: { checked: true } });
    });
    it('SignUpForm page after render', () => {
        const SignInWrapper = new SignupForm();
        SignInWrapper.props = {
            SignUpUser: { emailId: '' },
        };
        const nextProps = {
            SignUpUser: { emailId: 'Overstock@gmail.gov' },
        };
        // shallowWrapper.setState({ formSubmitSuccess: true });
        SignInWrapper.componentWillReceiveProps(nextProps);
    });
    it('SignUpForm page after render', () => {
        const SignInWrapper = new SignupForm();
        SignInWrapper.props = {
            SignUpUser: { emailId: '' },
        };
        const nextProps = {
            SignUpUser: { emailId: '' },
        };
        // shallowWrapper.setState({ formSubmitSuccess: true });
        SignInWrapper.componentWillReceiveProps(nextProps);
    });
    // it('checkHasGovEmail should be invoked', () => {
    //     const change = sinon.spy();
    //     shallowWrapper.setProps({ change, emailId: 'test@test.gov' });
    //     shallowWrapper.instance().checkHasGovEmail({ target: { checked: true } });
    //     expect(change.calledOnce).to.be.true;
    // });
    // it('checkHasGovEmail should be invoked with .gov', () => {
    //     const change = sinon.spy();
    //     shallowWrapper.setProps({ change, emailId: 'test@test.gov' });
    //     shallowWrapper.instance().checkHasGovEmail({ target: { checked: true } });
    //     expect(change.calledOnce).to.be.false;
    // });
    // it('checkHasGovEmail should be invoked but checkHasGovEmail false', () => {
    //     const change = sinon.spy();
    //     shallowWrapper.setProps({ change, emailId: 'test@test.com' });
    //     shallowWrapper.instance().checkHasGovEmail({ target: { checked: true } });
    //     expect(change.calledOnce).to.be.false;
    // });
    it('Submit the form', () => {
        component.find('form').at(0).props().onSubmit();
    });
    it('funtion 1 should be invoked', () => {
        shallowWrapper.instance().recaptchaVerifyCallback();
    });
    it('funtion recaptchaOnLoadCallback should be invoked', () => {
        shallowWrapper.instance().recaptchaOnLoadCallback();
    });
    it('Trigger handle click method when user focused out from email field', () => {
        const e = {
            preventDefault: sinon.spy(),
        };
        // const change = sinon.spy();
        // const checkboxState = true;
        // shallowWrapper.setProps({ change, checkboxState });
        shallowWrapper.instance().isEmailHasGovermentEmail(e);
    });
});
