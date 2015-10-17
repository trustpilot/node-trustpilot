'use strict';

var ProductReview = require('../src/productReviewApi/productReview');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe.only('ProductReview Api', function () {
  describe('when the promises are fulfilled', function () {
    var productReview;
    var request;

    beforeEach(function (done) {
      request = {
        get: function () {
          return Promise.resolve({
            somedata: 'some data that is returned by the api'
          });
        },

        post: function () {
          return Promise.resolve({
            statusCode: '200 OK'
          });
        },

        delete: function () {
          return Promise.resolve({
            statusCode: '200 OK'
          });
        }
      };

      productReview = new ProductReview(request);

      done();
    });

    describe('createInvitationLink function', function () {
      it('is fulfilled', function () {
        return productReview.createInvitationLink('123456').should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return productReview.createInvitationLink('123456').should.eventually.deep.equal({statusCode: '200 OK'});
      });
    });

    describe('getPrivate function', function () {
      it('is fulfilled', function () {
        return productReview.getPrivate('123456').should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return productReview.getPrivate('123456').should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });

    describe('getSummariesList function', function () {
      it('is fulfilled', function () {
        return productReview.getSummariesList('123456').should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return productReview.getSummariesList('123456').should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });

    describe('getPrivateSingle function', function () {
      it('is fulfilled', function () {
        return productReview.getPrivateSingle('123456').should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return productReview.getPrivateSingle('123456').should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });

    describe('createConversation function', function () {
      it('is fulfilled', function () {
        return productReview.createConversation('123456').should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return productReview.createConversation('123456').should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });

    describe('getSummary function', function () {
      it('is fulfilled', function () {
        return productReview.getSummary('123456').should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return productReview.getSummary('123456').should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });

    describe('getProductReviews function', function () {
      it('is fulfilled', function () {
        return productReview.getProductReviews('123456').should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return productReview.getProductReviews('123456').should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });

    describe('getConversation function', function () {
      it('is fulfilled', function () {
        return productReview.getConversation('123456').should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return productReview.getConversation('123456').should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });

    describe('createComment function', function () {
      it('is fulfilled', function () {
        return productReview.createComment('123456').should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return productReview.createComment('123456').should.eventually.deep.equal({statusCode: '200 OK'});
      });
    });

    describe('getPrivateConversation function', function () {
      it('is fulfilled', function () {
        return productReview.getPrivateConversation('123456').should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return productReview.getPrivateConversation('123456').should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });

    describe('saveCoversationState function', function () {
      it('is fulfilled', function () {
        return productReview.saveCoversationState('123456').should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return productReview.saveCoversationState('123456').should.eventually.deep.equal({statusCode: '200 OK'});
      });
    });

    describe('getComment function', function () {
      it('is fulfilled', function () {
        return productReview.getComment('123456', '12345').should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return productReview.getComment('123456', '12345').should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });
  });
});
