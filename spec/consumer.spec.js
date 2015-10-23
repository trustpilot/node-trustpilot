'use strict';

var Consumer = require('../src/consumerApi/consumer');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe('Consumer Api ', function () {
  describe('when the promises are fulfilled', function () {
    var consumer;
    var request;

    beforeEach(function (done) {
      request = {
        get: function () {
          return Promise.resolve({
            somedata: 'some data that is returned by the api'
          });
        }
      };

      consumer = new Consumer(request);

      done();
    });

    afterEach(function () {
      consumer = '';
    });

    describe('get consumer function', function () {
      it('is fulfilled', function () {
        return consumer.getConsumer('123456').should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return consumer.getConsumer('123456789').should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });

    describe('get consumer reviews function', function () {
      it('is fulfilled', function () {
        return consumer.getConsumerReviews('123456').should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return consumer.getConsumerReviews('123456789').should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });

    describe('get consumer web links function', function () {
      it('is fulfilled', function () {
        return consumer.getConsumerWebLinks('123456').should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return consumer.getConsumerWebLinks('123456789').should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });
  });

  describe('when the promises are rejected', function () {
    var consumer;
    var request;

    beforeEach(function (done) {
      request = {
        get: function () {
          return Promise.reject(new Error());
        }
      };

      consumer = new Consumer(request);

      done();
    });

    describe('get consumer function', function () {
      it('is rejected', function () {
        return consumer.getConsumer('123456798').should.be.rejected;
      });

      it('contains the proper response object', function () {
        return consumer.getConsumer('123456798').should.be.rejectedWith(Error);
      });
    });

    describe('get consumer reviews function', function () {
      it('is rejected', function () {
        return consumer.getConsumerReviews('123456798').should.be.rejected;
      });

      it('contains the proper response object', function () {
        return consumer.getConsumerReviews('123456798').should.be.rejectedWith(Error);
      });
    });

    describe('get consumer web links function', function () {
      it('is rejected', function () {
        return consumer.getConsumerWebLinks('123456798').should.be.rejected;
      });

      it('contains the proper response object', function () {
        return consumer.getConsumerWebLinks('123456798').should.be.rejectedWith(Error);
      });
    });
  });

  describe('when functions with required params are called', function () {
    var consumer;

    beforeEach(function () {
      consumer = new Consumer('unnecessary for this test');
    });

    afterEach(function () {
      consumer = '';
    });

    describe('when getConsumer() is called without a consumerId', function () {
      it('throws a new Error', function () {
        expect(function () {
          consumer.getConsumer();
        }).to.throw('consumerId is not present');
      });
    });

    describe('when getConsumerReviews() is called without a consumerId', function () {
      it('throws a new Error', function () {
        expect(function () {
          consumer.getConsumerReviews();
        }).to.throw('consumerId is not present');
      });
    });

    describe('when getConsumerWebLinks() is called without a consumerId', function () {
      it('throws a new Error', function () {
        expect(function () {
          consumer.getConsumerWebLinks();
        }).to.throw('is not present');
      });
    });
  });
});
