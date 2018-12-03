import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { beforeEach, describe } from 'mocha';
import { AccessProvider } from '../src/access-provider';
import { ITrustpilotApiConfig } from '../src/models';

chai.use(chaiAsPromised);

const expect = chai.expect;
let accessProvider: any;

describe('Acesss Provider Api ', () => {
  beforeEach((done) => {
    accessProvider = new AccessProvider({
      baseUrl: 'http://fakeHost.com',
      key: 'fakeKey',
      password: 'pass',
      secret: 'fakeSecret',
      username: 'user',
    } as ITrustpilotApiConfig) as any;
    done();
  });

  afterEach((done) => {
    accessProvider = {};
    done();
  });

  describe('the getAccessToken function', () => {
    describe('when access token is provided', () => {
      const accessToken = 'XXXXxa12xxXxXXxXxXXxXXXXXXXXX';
      const accessProviderWithToken = new AccessProvider({
        accessToken,
        baseUrl: 'http://fakeHost.com',
        key: 'fakeKey',
        password: 'pass',
        secret: 'fakeSecret',
        username: 'user',
      } as ITrustpilotApiConfig);
      it('should resolve', async () => {
        const data = await accessProviderWithToken.getApiAccessToken();
        expect(data).to.equal(accessToken);
      });
    });

    describe('when the authorization token does not exist', () => {
      it('should resolve with a token because one is made', async () => {
        accessProvider.createApiAccessToken = async () => {
          return {
            access_token: 68465341496,
          };
        };

        const data = await accessProvider.getApiAccessToken();
        expect(data).to.equal(68465341496);
      });
    });

    describe('when the promise is rejected', () => {
      it('should handle the promise rejection', async () => {
        accessProvider.createApiAccessToken = async () => {
          throw new Error();
        };

        await expect(accessProvider.getApiAccessToken()).to.be.rejectedWith(Error);
      });
    });

    describe('when a token request is in flight', () => {
      it('should re-use the same promise for all concurrent calls', async () => {
        accessProvider.createApiAccessToken = async () => {
          return {
            access_token: Math.random(),
          };
        };

        const tokenX = await accessProvider.getApiAccessToken();
        const tokenY = await accessProvider.getApiAccessToken();
        const tokenZ = await accessProvider.getApiAccessToken();

        expect(tokenX).to.equal(tokenY).and.to.equal(tokenZ);
      });
    });
  });

  describe('the isTokenValid function is called', () => {
    describe('when the accessProvider does not have an authorization object', () => {
      it('should return false', () => {
        expect(accessProvider.isTokenValid()).to.equal(false);
      });
    });

    describe('when the authorization access token is no longer valid', () => {
      it('should return false', () => {
        accessProvider.authorization = {
          expires_in: 360000,
          issued_at: 592786800000, // Fri Oct 14 1988 00:00:00 GMT+0100 (CET)
        };

        expect(accessProvider.isTokenValid()).to.equal(false);
      });
    });
  });
});
