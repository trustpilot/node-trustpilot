'use strict';

var ProductReview = require('../src/productReviewApi/productReview');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe('ProductReview Api', function () {
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

  describe('when the promises are rejected', function () {
    var productReview;
    var request;

    beforeEach(function (done) {
      request = {
        get: function () {
          return Promise.reject(new Error());
        },

        post: function () {
          return Promise.reject(new Error());
        },

        delete: function () {
          return Promise.reject(new Error());
        }
      };

      productReview = new ProductReview(request);

      done();
    });

    describe('createInvitationLink function', function () {
      it('is rejected', function () {
        return productReview.createInvitationLink('123456').should.be.rejected;
      });

      it('contains the proper response object', function () {
        return productReview.createInvitationLink('123456').should.be.rejectedWith(Error);
      });
    });

    describe('getPrivate function', function () {
      it('is rejected', function () {
        return productReview.getPrivate('123456').should.be.rejected;
      });

      it('contains the proper response object', function () {
        return productReview.getPrivate('123456').should.be.rejectedWith(Error);
      });
    });

    describe('getSummariesList function', function () {
      it('is rejected', function () {
        return productReview.getSummariesList('123456').should.be.rejected;
      });

      it('contains the proper response object', function () {
        return productReview.getSummariesList('123456').should.be.rejectedWith(Error);
      });
    });

    describe('getPrivateSingle function', function () {
      it('is rejected', function () {
        return productReview.getPrivateSingle('123456').should.be.rejected;
      });

      it('contains the proper response object', function () {
        return productReview.getPrivateSingle('123456').should.be.rejectedWith(Error);
      });
    });

    describe('createConversation function', function () {
      it('is rejected', function () {
        return productReview.createConversation('123456').should.be.rejected;
      });

      it('contains the proper response object', function () {
        return productReview.createConversation('123456').should.be.rejectedWith(Error);
      });
    });

    describe('getSummary function', function () {
      it('is rejected', function () {
        return productReview.getSummary('123456').should.be.rejected;
      });

      it('contains the proper response object', function () {
        return productReview.getSummary('123456').should.be.rejectedWith(Error);
      });
    });

    describe('getProductReviews function', function () {
      it('is rejected', function () {
        return productReview.getProductReviews('123456').should.be.rejected;
      });

      it('contains the proper response object', function () {
        return productReview.getProductReviews('123456').should.be.rejectedWith(Error);
      });
    });

    describe('getConversation function', function () {
      it('is rejected', function () {
        return productReview.getConversation('123456').should.be.rejected;
      });

      it('contains the proper response object', function () {
        return productReview.getConversation('123456').should.be.rejectedWith(Error);
      });
    });

    describe('createComment function', function () {
      it('is rejected', function () {
        return productReview.createComment('123456').should.be.rejected;
      });

      it('contains the proper response object', function () {
        return productReview.createComment('123456').should.be.rejectedWith(Error);
      });
    });

    describe('getPrivateConversation function', function () {
      it('is rejected', function () {
        return productReview.getPrivateConversation('123456').should.be.rejected;
      });

      it('contains the proper response object', function () {
        return productReview.getPrivateConversation('123456').should.be.rejectedWith(Error);
      });
    });

    describe('saveCoversationState function', function () {
      it('is rejected', function () {
        return productReview.saveCoversationState('123456').should.be.rejected;
      });

      it('contains the proper response object', function () {
        return productReview.saveCoversationState('123456').should.be.rejectedWith(Error);
      });
    });

    describe('getComment function', function () {
      it('is rejected', function () {
        return productReview.getComment('123456', '7890').should.be.rejected;
      });

      it('contains the proper response object', function () {
        return productReview.getComment('123456', '7890').should.be.rejectedWith(Error);
      });
    });
  });

  describe('when functions with required params are called', function () {
    var productReview = new ProductReview('unnecessary for this test');
    describe('when createInvitationLink() is called without a businessUnitId', function () {
      it('throws a new Error', function () {
        expect(productReview.createInvitationLink).to.throw(Error);
      });
    });

    describe('when getSummariesList() is called without a businessUnitId', function () {
      it('throws a new Error', function () {
        expect(productReview.getSummariesList).to.throw(Error);
      });
    });

    describe('when getPrivateSingle() is called without a reviewId', function () {
      it('throws a new Error', function () {
        expect(productReview.getPrivateSingle).to.throw(Error);
      });
    });

    describe('when createConversation() is called without a reviewId', function () {
      it('throws a new Error', function () {
        expect(productReview.createConversation).to.throw(Error);
      });
    });

    describe('when getSummary() is called without a businessUnitId', function () {
      it('throws a new Error', function () {
        expect(productReview.getSummary).to.throw(Error);
      });
    });

    describe('when getProductReviews() is called without a businessUnitId', function () {
      it('throws a new Error', function () {
        expect(productReview.getProductReviews).to.throw(Error);
      });
    });

    describe('when getConversation() is called without a conversationId', function () {
      it('throws a new Error', function () {
        expect(productReview.getConversation).to.throw(Error);
      });
    });

    describe('when createComment() is called without a conversationId', function () {
      it('throws a new Error', function () {
        expect(productReview.createComment).to.throw(Error);
      });
    });

    describe('when getPrivateConversation() is called without a conversationId', function () {
      it('throws a new Error', function () {
        expect(productReview.getPrivateConversation).to.throw(Error);
      });
    });

    describe('when saveCoversationState() is called without a conversationId', function () {
      it('throws a new Error', function () {
        expect(productReview.saveCoversationState).to.throw(Error);
      });
    });

    describe('when getComment() is called without a conversationId or commentId', function () {
      it('throws a new Error', function () {
        expect(productReview.getComment).to.throw(Error);
      });
    });
  });
});
