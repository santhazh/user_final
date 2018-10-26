import { expect } from 'chai';
import { describe, it } from 'mocha';
import 'isomorphic-fetch';
import nock from 'nock';
import RestClient from './RestClient';
import UserManagementApi from './UserManagementApi';
// import * as ApiConstants from './ApiConstants';

describe('SignUp api', () => {
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

    it('SignUp API should have detail', () => {
        const data = 20171220000065;
        nock('https://content-api-test.jcpenney.com/').get('/users').reply(200, {});

        UserManagementApi(data).then(response => {
            expect(response).deep.equals({});
        });
    });

    it('SignUp Cases', () => {
        RestClient.setContext(context1);
    });
});
