'use strict';

var AccessProvider = require('../src/accessProvider');
var mockery = require('mockery');
var fs = require('fs');
var Bluebird = require('bluebird');
var chai = require('chai');
var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');

var rejectOrResolve;
var accessProvider;

chai.use(chaiAsPromised);

describe.only('Acesss Provider Api ', function () {
  beforeEach(function (done) {
    var filename = 'testResponse.json';

    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });

    mockery.registerMock('request-promise', function () {
      var response = fs.readFileSync(__dirname + '/' + filename, 'utf8');

      //resolve or reject the request-promise promise depend on the need of the test
      return Bluebird.resolve(response);
    });

    accessProvider = new AccessProvider('fakeKey', 'http://fakeHost.com', 'fakeSecret');

    done();
  });

  afterEach(function (done) {
    mockery.disable();
    mockery.deregisterAll();

    rejectOrResolve = '';

    accessProvider = {};

    done();
  });

  describe('the getAccessToken function', function () {
    describe('when the authorization token exists and is valid', function () {
      it('should resolve', function () {
        accessProvider.authorization = {
          issued_at: Date.now(), //new Date
          expires_in: 360000,
          access_token: 123456789
        };

        return accessProvider.getAccessToken().then(function (data) {
          expect(data).to.equal(accessProvider.authorization.access_token);
        });
      });
    });

    describe('when the authorization token does not exist', function () {
      it('should resolve with a token', function () {
        accessProvider.generateTokenObject = function () {
          return Promise.resolve({
            access_token: 68465341496
          });
        };

        return accessProvider.getAccessToken().then(function (data) {
          expect(data).to.equal(68465341496);
        });
      });
    });

    describe('when the promise is rejected', function () {
      it('should handle the promise rejection', function () {
        accessProvider.generateTokenObject = function () {
          return Promise.reject(new Error());
        };

        return accessProvider.getAccessToken().catch(function (data) {
          expect(data).to.deep.equal(Error());
        });
      });
    });
  });

  describe('the isTokenValid function is called', function () {
    describe('when the accessProvider does not have an authorization object', function () {
      it('should return false', function () {
        expect(accessProvider.isTokenValid()).to.equal(false);
      });
    });

    describe('when the authorization access token is no longer valid', function () {
      it('should return false', function () {
        accessProvider.authorization = {
          issued_at: 592786800000, //Fri Oct 14 1988 00:00:00 GMT+0100 (CET)
          expires_in: 360000
        };

        expect(accessProvider.isTokenValid()).to.equal(false);
      });
    });

    describe('when the authorization access token is valid', function () {
      it('should return true', function () {

        accessProvider.authorization = {
          issued_at: Date.now(), //new Date
          expires_in: 360000
        };

        expect(accessProvider.isTokenValid()).to.equal(true);

      });
    });
  });
});
