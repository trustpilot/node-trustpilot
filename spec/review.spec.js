'use strict';

// var Review = require('../src/reviewApi/review');
var mockery = require('mockery');
var fs = require('fs');
var chaiAsPromised = require('chai-as-promised');
var Bluebird = require('bluebird');
var sinon = require('sinon');


describe('app', function () {
  console.log('something');
  beforeEach(function (done) {
    console.log('something');
    var filename = 'testResponse.txt';
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });

    mockery.registerMock('request-promise', function () {
      var response = fs.readFileSync(__dirname + '/' + filename, 'utf8');
      console.log(response);
      return Bluebird.resolve(response);
    });

    done();
  });

  afterEach(function (done) {
    mockery.disable();
    mockery.deregisterAll();
    done();
  });

  describe('custom test case', function () {

    it('does soemthing', function () {
      var rp = require('request-promise');
      rp('http://www.e-try.com/black.html').then(function (data) {
        console.log(data);
      });
    });
  });

});
