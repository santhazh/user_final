// import React from 'react';
// import { Provider } from 'react-redux';
// import { mount, shallow } from 'enzyme';
// import { expect } from 'chai';
// import sinon from 'sinon';
// import configureStore from 'redux-mock-store';
// import ProfessionalForm, { Professional } from './Professional';

// describe('Test suits for <Professional />', () => {
//     let component;
//     const nextPage = sinon.spy();
//     const previousPage = sinon.spy();
//     const handleSubmit = sinon.spy();
//     const props = {
//         actions:
//         {
//             nextPage, previousPage,
//         },
//     };
//     const shallowWrapper = shallow(
//         <Professional {...props} />,
//     );
//     const mockStore = configureStore([]);
//     const store = mockStore({
//     });
//     beforeEach(() => {
//         component = mount(
//             <Provider store={store}>
//                 <ProfessionalForm
//                     submitCase={handleSubmit} />
//             </Provider>,
//         );
//     });
//     afterEach(() => {
//         component.unmount();
//     });

//     it('Check if the werapper component exist', () => {
//         expect(shallowWrapper).to.exist;
//     });

//     it('Professional page API called and UI should render', () => {
//         const instance = shallowWrapper.instance();
//         instance.nextPage();
//         instance.previousPage();
//         instance.onSubmit();
//         instance.closeModel();
//         instance.businessTypeChange();
//     });

//     it('Professional page after render', () => {
//         const instance = shallowWrapper.instance();
//         instance.nextPage();
//         instance.nextPage();
//         shallowWrapper.setState({ currentStep: 2 });
//     });
// });
