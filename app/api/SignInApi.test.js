import { expect } from 'chai';
import { describe, it } from 'mocha';
import 'isomorphic-fetch';
import nock from 'nock';
import RestClient from './RestClient';
import SignInApi from './SignInApi';
import * as ApiConstants from './ApiConstants';

describe('SignIn api', () => {
    const context1 = {
        hostname: 'http://b2bsandbox.b2bmarketplacedev.test.ostk.com:8084/b2b/',
        isBrowser: true,
        isSecure: true,
    };

    beforeEach(() => {
        RestClient.setContext(context1);
    });

    afterEach(() => {
        nock.cleanAll();
    });

    it('SignIn API should have detail', () => {
        const data = 20171220000065;
        nock('https://content-api-test.jcpenney.com/').post(`${ApiConstants.CUSTOMER_SIGNIN}`,
         { emailId: 'kalidass1@gmail.com',
        password: 'thomas_password' }).reply(200, {});

        SignInApi(data).then(response => {
            expect(response).deep.equals({});
        });
    });

    it('SignIn Cases', () => {
        RestClient.setContext(context1);
    });
});
