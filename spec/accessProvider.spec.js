'use strict';

var AccessProvider = require('../src/accessProvider');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');

var accessProvider;

chai.use(chaiAsPromised);

describe('Acesss Provider Api ', () => {
  beforeEach((done) => {
    accessProvider = new AccessProvider('fakeKey', 'fakeSecret', 'user', 'pass', 'http://fakeHost.com');
    done();
  });

  afterEach((done) => {
    accessProvider = {};
    done();
  });

  describe('the getAccessToken function', () => {
    describe('when the authorization token exists and is valid', () => {
      it('should resolve', () => {
        accessProvider.authorization = {
          'issued_at': Date.now(),
          'expires_in': 360000,
          'access_token': 123456789
        };

        return accessProvider.getAccessToken().then((data) => {
          expect(data).to.equal(accessProvider.authorization.access_token);
        });
      });
    });

    describe('when the authorization token does not exist', () => {
      it('should resolve with a token because one is made', () => {
        accessProvider.generateTokenObject = () => {
          return Promise.resolve({
            'access_token': 68465341496
          });
        };

        return accessProvider.getAccessToken().then((data) => {
          expect(data).to.equal(68465341496);
        });
      });
    });

    describe('when the promise is rejected', () => {
      it('should handle the promise rejection', () => {
        accessProvider.generateTokenObject = () => {
          return Promise.reject(new Error());
        };

        return accessProvider.getAccessToken().catch((data) => {
          expect(data).to.deep.equal(Error());
        });
      });
    });

    describe('when a token request is in flight', () => {
      it('should re-use the same promise for all concurrent calls', () => {
        accessProvider.generateTokenObject = () => {
          return Promise.resolve({
            'access_token': Math.random()
          });
        };

        var x = accessProvider.getAccessToken();
        var y = accessProvider.getAccessToken();
        var z = accessProvider.getAccessToken();

        return Promise.all([x, y, z]).then((results) => {
          var tokenX = results[0];
          var tokenY = results[1];
          var tokenZ = results[2];
          expect(tokenX).to.equal(tokenY).and.to.equal(tokenZ);
        });
      });
    });

    describe('after a token expires', () => {
      it('should make a new request to get a fresh token', () => {
        accessProvider.generateTokenObject = () => {
          return Promise.resolve({
            'access_token': Math.random()
          });
        };

        return accessProvider.getAccessToken().then((firstToken) => {
          // Artificially expire our token
          accessProvider.authorization = {
            'issued_at': 592786800000, // Fri Oct 14 1988 00:00:00 GMT+0100 (CET)
            'expires_in': 360000
          };

          return accessProvider.getAccessToken().then((secondToken) => {
            expect(firstToken).to.not.equal(secondToken);
          });
        });
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
          'issued_at': 592786800000, // Fri Oct 14 1988 00:00:00 GMT+0100 (CET)
          'expires_in': 360000
        };

        expect(accessProvider.isTokenValid()).to.equal(false);
      });
    });

    describe('when the authorization access token is valid', () => {
      it('should return true', () => {

        accessProvider.authorization = {
          'issued_at': Date.now(), //new Date
          'expires_in': 360000
        };

        expect(accessProvider.isTokenValid()).to.equal(true);

      });
    });
  });
});
