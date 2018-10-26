import { expect } from 'chai';
import { describe, it } from 'mocha';
import 'isomorphic-fetch';
import nock from 'nock';
import RestClient from './RestClient';
import GovtApi from './GovtApi';
import * as ApiConstants from './ApiConstants';
import { GOV_CATEGORIES_LIST } from '../common/Constants';

describe('Govt api', () => {
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

    it('Govt API should have detail', () => {
        const data = 20171220000065;
        nock('http://b2bsandbox.b2bmarketplacedev.test.ostk.com:8084/b2b/').get(`${ApiConstants.GOVT_CATEGORIES}`).reply(200, GOV_CATEGORIES_LIST);

        GovtApi(data).then(response => {
            // console.log('response&&&', response);
            expect(response).deep.equals(GOV_CATEGORIES_LIST);
        });
    });

    it('Govt Cases', () => {
        RestClient.setContext(context1);
    });
});
