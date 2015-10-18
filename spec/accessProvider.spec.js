'use strict';

var Trustpilot = require('../src/client');
var Review = require('../src/reviewApi/review');
var mockery = require('mockery');
var fs = require('fs');
var Bluebird = require('bluebird');
var chai = require('chai');
var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe('Reviews Api ', function () {
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

});


//var request = require('request-promise');
