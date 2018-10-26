import { expect } from 'chai';
import { describe, it } from 'mocha';
import 'isomorphic-fetch';
import nock from 'nock';
import RestClient from './RestClient';
import ProfessionalApi from './ProfessionalApi';
import * as ApiConstants from './ApiConstants';
import { PROFESSIONAL_BENEFITS } from '../common/Constants';

describe('Professional api', () => {
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

    it('Professional API should have detail', () => {
        const data = 20171220000065;
        nock('http://b2bsandbox.b2bmarketplacedev.test.ostk.com:8084/b2b/').get(`${ApiConstants.BUSINESS_CATEGORIES}`).reply(200, PROFESSIONAL_BENEFITS);

        ProfessionalApi(data).then(response => {
            // console.log('response&&&', response);
            expect(response).deep.equals(PROFESSIONAL_BENEFITS);
        });
    });

    it('Professional Cases', () => {
        RestClient.setContext(context1);
    });
});
