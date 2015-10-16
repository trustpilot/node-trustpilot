'use strict';

var Trustpilot = require('../src/client');
var Review = require('../src/reviewApi/review');
var mockery = require('mockery');
var fs = require('fs');
var Bluebird = require('bluebird');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe('app', function () {
  before(function (done) {
    var filename = 'testResponse.json';
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });

    mockery.registerMock('request-promise', function () {
      var response = fs.readFileSync(__dirname + '/' + filename, 'utf8');
      return Bluebird.resolve(response);
    });

    done();
  });

  after(function (done) {
    mockery.disable();
    mockery.deregisterAll();
    done();
  });

  describe('custom test case', function () {
    //var request = require('request-promise');
    var request = {
      get: function () {
        return Promise.resolve({message: 'something'});
      }
    };

    var review = new Review(request);

    it('does soemthing', function () {
      return review.getLatest().should.eventually.deep.equal({message: 'somdsafdsaething'});

      // rp('http://www.e-try.com/black.html').then(function (data) {
      //   console.log(data);
      // });
    });
  });

});
