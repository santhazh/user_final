import { expect } from 'chai';
import { afterEach, beforeEach, describe, it } from 'mocha';
import nock from 'nock';
import { spy, assert } from 'sinon';
import * as ApiConstants from './ApiConstants';
import { OverstockRestConfig } from '../common/OverstockRestConfig';
import RestClient from './RestClient';

describe('GET API', () => {
    let config = {
        url: 'savedItems',
        version: '/v2.1',
    };
    let context = {
        hostname: 'http://b2bsandbox.b2bmarketplacedev.test.ostk.com:8084/b2b/',
        isSecure: true,
        apiPrefixInternal: 'test',
        host: 'http://b2bsandbox.b2bmarketplacedev.test.ostk.com:8084/b2b/',
        headers: {
            Accept: 'application/json, text/plain, */*',
            cookie: 'DPClusterL1',
        },
    };

    beforeEach(() => {
        nock('http://b2bsandbox.b2bmarketplacedev.test.ostk.com:8084/b2b/').get(`${ApiConstants.GOVT_CATEGORIES}`).reply(200, { success: {} });
        if (RestClient.get.restore) {
            RestClient.get.restore();
        }
    });

    afterEach(() => {
        nock.cleanAll();
    });

    it('Get and verfiy response data with default context and config', () => {
        RestClient.setContext(context);
        RestClient.get(config).then(response => {
            // console.log('&&&&response', response);
            expect(response).to.have.property('id');
            expect(response.data).to.be.an('object');
            expect(response.data).not.to.be.empty;
        });
    });

    it('Get and verfiy response data with config -> params & encode', () => {
        config.params = { expand: true };
        config.encode = true;
        config.credentials = 'include';
        RestClient.setContext(context);
        RestClient.get(config).then(response => {
            expect(response).to.have.property('data');
            expect(response.data).to.be.an('object');
            expect(response.data).not.to.be.empty;
        });
    });

    it('Get and verfiy response data with config -> params', () => {
        config.params = { expand: true };
        config.encode = undefined;
        config.credentials = 'same-origin';
        context.isBrowser = true;
        config.isAuthRequired = true;
        global.document = {};
        RestClient.setContext(context);
        RestClient.get(config).then(response => {
            expect(response).to.have.property('data');
            expect(response.data).to.be.an('object');
            expect(response.data).not.to.be.empty;
        });
    });

    it('Get and verfiy response data with config -> full url', () => {
        config = `${OverstockRestConfig.ApiConfig()}${ApiConstants.GOVT_CATEGORIES}`;
        context = {
            isSecure: false,
            apiPrefixInternal: '',
            hostname: 'm.jcpenney.com',
        };
        process.env.NODE_ENV = 'development';
        RestClient.setContext(context);
        RestClient.get(config).then(response => {
            expect(response).to.have.property('data');
            expect(response.data).to.be.an('object');
            expect(response.data).not.to.be.empty;
        });
    });

    it('Get and verfiy response data with config and context', () => {
        config = {
            url: 'http://b2bsandbox.b2bmarketplacedev.test.ostk.com:8084/b2b/govt-org-categories',
            version: '',
            external: true,
            host: 'http://b2bsandbox.b2bmarketplacedev.test.ostk.com:8084/b2b/',
            credentials: 'omit',
            isAuthRequired: true,
        };
        context = {
            isSecure: false,
            apiPrefixInternal: '',
            headers: {
            },
        };
        RestClient.setContext(context);
        RestClient.get(config).then(response => {
            expect(response).to.have.property('data');
            expect(response.data).to.be.an('object');
            expect(response.data).not.to.be.empty;
        });
    });

    it('Get API - 500 error', () => {
        nock.cleanAll();
        nock('http://b2bsandbox.b2bmarketplacedev.test.ostk.com:8084/b2b/').get('govt-org-categories').replyWithError({
            message: 'Error Occurred',
            code: 'GENERIC_ERROR',
        });

        RestClient.get(config).then(response => {
            expect(response).to.be.an(undefined);
        });
    });

    it('Get API - API should be called only once', () => {
        spy(RestClient, 'get');
        nock('http://b2bsandbox.b2bmarketplacedev.test.ostk.com:8084/b2b/').get('govt-org-categories').reply(200, {});
        RestClient.get(config);
        assert.calledOnce(RestClient.get);
    });


    it('Get API - API should be called with the params', () => {
        spy(RestClient, 'get');
        nock('http://b2bsandbox.b2bmarketplacedev.test.ostk.com:8084/b2b/').get('govt-org-categories').reply(200, {});
        RestClient.get(config);
        assert.calledWithExactly(RestClient.get, config);
    });

    it('Get API - 200 but emptry string', () => {
        nock.cleanAll();
        nock('http://b2bsandbox.b2bmarketplacedev.test.ostk.com:8084/b2b/').get('govt-org-categories').reply(200, '');
        RestClient.get(config).then(response => {
            expect(response).to.have.property('data');
            expect(response.data).to.be.an('object');
            expect(response.data).to.have.property('response');
            expect(response.data.response).to.equal('');
        });
    });
});

describe('POST API', () => {
    const config = {
        url: 'customer-signup/',
        data: {
            emailId: 'kalidass1@gmail.com',
            password: 'thomas_password',
        },
    };

    beforeEach(() => {
        RestClient.setContext({ hostname: 'http://b2bsandbox.b2bmarketplacedev.test.ostk.com:8084/b2b/' });
    });

    afterEach(() => {
        nock.cleanAll();
        if (RestClient.post.restore) {
            RestClient.post.restore();
        }
    });

    it('Post and verfiy response with params', () => {
        nock('http://b2bsandbox.b2bmarketplacedev.test.ostk.com:8084/b2b/').post('customer-signup/', {
                emailId: 'kalidass1@gmail.com',
                password: 'thomas_password',
        }).reply(201);
        RestClient.post(config).then(response => {
            expect(response.status).to.be.equal(201);
            expect(response.statusText).to.be.equal(undefined);
        });
    });

    it('Post and verfiy response without params', () => {
        config.params = '';
        nock('http://b2bsandbox.b2bmarketplacedev.test.ostk.com:8084/b2b/').post('customer-signup/').reply(201);
        RestClient.post(config).then(response => {
            expect(response.status).to.be.equal(201);
            expect(response.statusText).to.be.equal(undefined);
        });
    });

    it('Post API - 500 error', () => {
        nock('http://b2bsandbox.b2bmarketplacedev.test.ostk.com:8084/b2b/').post('customer-signup/').replyWithError({
            message: 'Error Occurred',
            code: 'GENERIC_ERROR',
        });

        RestClient.post(config).then(response => {
            expect(response).to.be.an(undefined);
        });
    });

    it('Post API - API should be called only once', () => {
        spy(RestClient, 'post');
        nock('http://b2bsandbox.b2bmarketplacedev.test.ostk.com:8084/b2b/').post('customer-signup/').reply(200, {});
        RestClient.post(config);
        assert.calledOnce(RestClient.post);
    });

    it('Post API - API should be called with the params', () => {
        spy(RestClient, 'post');
        nock('http://b2bsandbox.b2bmarketplacedev.test.ostk.com:8084/b2b/').post('customer-signup/').reply(200, {});
        RestClient.post(config);
        assert.calledWithExactly(RestClient.post, config);
    });
});

describe('PUT API', () => {
    const config = {
        url: '/user',
    };

    beforeEach(() => {
        RestClient.setContext({ hostname: 'http://b2bsandbox.b2bmarketplacedev.test.ostk.com:8084/b2b/' });
    });

    afterEach(() => {
        nock.cleanAll();
        if (RestClient.put.restore) {
            RestClient.put.restore();
        }
    });

    it('Put and verfiy response with params', () => {
        nock('http://b2bsandbox.b2bmarketplacedev.test.ostk.com:8084/b2b/').put('user').reply(204);
        RestClient.put(config).then(response => {
            expect(response.status).to.be.equal(204);
            expect(response.statusText).to.be.equal('No Content');
        });
    });

    it('Put and verfiy response without params', () => {
        config.params = '';
        nock('http://b2bsandbox.b2bmarketplacedev.test.ostk.com:8084/b2b/').put('user').reply(204);
        RestClient.put(config).then(response => {
            expect(response.status).to.be.equal(204);
            expect(response.statusText).to.be.equal('No Content');
        });
    });

    it('Put API - 500 error', () => {
        nock('http://b2bsandbox.b2bmarketplacedev.test.ostk.com:8084/b2b/').put('user').replyWithError({
            message: 'Error Occurred',
            code: 'GENERIC_ERROR',
        });

        RestClient.put(config).then(response => {
            expect(response).to.be.an(undefined);
        });
    });

    it('Put API - API should be called only once', () => {
        spy(RestClient, 'put');
        nock('http://b2bsandbox.b2bmarketplacedev.test.ostk.com:8084/b2b/').put('user').reply(204);
        RestClient.put(config);
        assert.calledOnce(RestClient.put);
    });

    it('Put API - API should be called with the params', () => {
        spy(RestClient, 'put');
        nock('http://b2bsandbox.b2bmarketplacedev.test.ostk.com:8084/b2b/').put('user').reply(204);
        RestClient.put(config);
        assert.calledWithExactly(RestClient.put, config);
    });
});

describe('DELETE API', () => {
    const config = {
        url: '/user',
    };

    beforeEach(() => {
        RestClient.setContext({ hostname: 'http://b2bsandbox.b2bmarketplacedev.test.ostk.com:8084/b2b/' });
    });

    afterEach(() => {
        nock.cleanAll();
        if (RestClient.delete.restore) {
            RestClient.delete.restore();
        }
    });

    it('Delete and verfiy response with params', () => {
        nock('http://b2bsandbox.b2bmarketplacedev.test.ostk.com:8084/b2b/').delete(/user/).reply(200, {});
        RestClient.delete(config).then(response => {
            expect(response.status).to.be.equal(200);
            expect(response.statusText).to.be.equal('OK');
        });
    });

    it('Delete and verfiy response without params', () => {
        config.url = '/savedItems/c1gi536736132';
        config.params = '';
        nock('http://b2bsandbox.b2bmarketplacedev.test.ostk.com:8084/b2b/').delete(/user/).reply(200, {});
        RestClient.delete(config).then(response => {
            expect(response.status).to.be.equal(200);
            expect(response.statusText).to.be.equal('OK');
        });
    });

    it('Delete API - 500 error', () => {
        nock('http://b2bsandbox.b2bmarketplacedev.test.ostk.com:8084/b2b/').delete(/user/).replyWithError({
            message: 'Error Occurred',
            code: 'GENERIC_ERROR',
        });

        RestClient.delete(config).then(response => {
            expect(response).to.be.an(undefined);
        });
    });

    it('Delete API - API should be called only once', () => {
        spy(RestClient, 'delete');
        nock('http://b2bsandbox.b2bmarketplacedev.test.ostk.com:8084/b2b/').delete(/user/).reply(200, {});
        RestClient.delete(config);
        assert.calledOnce(RestClient.delete);
    });

    it('Delete API - API should be called with the params', () => {
        spy(RestClient, 'delete');
        nock('http://b2bsandbox.b2bmarketplacedev.test.ostk.com:8084/b2b/').delete(/user/).reply(200, {});
        RestClient.delete(config);
        assert.calledWithExactly(RestClient.delete, config);
    });
});

describe('JSONP API', () => {
    beforeEach(() => {
        RestClient.setContext({ hostname: 'http://b2bsandbox.b2bmarketplacedev.test.ostk.com:8084/b2b/', isSecure: true });
    });
    it('should return empty response when config is empty', () => {
        const response = RestClient.jsonp({ external: true });
        expect(response).to.eql({});
        expect(response).to.be.empty;
    });
});
