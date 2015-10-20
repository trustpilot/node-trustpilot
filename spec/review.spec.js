'use strict';

var Review = require('../src/reviewApi/review');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe('Reviews Api ', function () {
  describe('when the promises are fulfilled', function () {
    var review;
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

      review = new Review(request);

      done();
    });

    //var request = require('request-promise');

    describe('get latest reviews function', function () {
      it('is fulfilled', function () {
        return review.getLatest().should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return review.getLatest().should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });

    describe('get a single review function', function () {
      it('get() is fulfilled', function () {
        return review.get('12345').should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return review.get('12345').should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });

    describe('get a single private review function', function () {
      it('getPrivate() is fulfilled', function () {
        return review.getPrivate('12345').should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return review.getPrivate('12345').should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });

    describe('get a single review\'s web links function', function () {
      it('getWebLinks() is fulfilled', function () {
        return review.getWebLinks('12345').should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return review.getWebLinks('12345').should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });

    describe('get a single review\'s likes function', function () {
      it('getLikes() is fulfilled', function () {
        return review.getLikes('12345').should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return review.getLikes('12345').should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });

    describe('get a single review\'s tags function', function () {
      it('getTags() is fulfilled', function () {
        return review.getTags('12345').should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return review.getTags('12345').should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });

    describe('save a single review\'s tags function', function () {
      it('saveTags() is fulfilled', function () {
        return review.saveTags('12345').should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return review.saveTags('12345').should.eventually.deep.equal({  statusCode: '200 OK'});
      });
    });

    describe('save a single review\'s reply function', function () {
      it('reply() is fulfilled', function () {
        return review.reply('12345').should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return review.reply('12345').should.eventually.deep.equal({  statusCode: '200 OK'});
      });
    });

    describe('delete a single review\'s function', function () {
      it('deleteReply() is fulfilled', function () {
        return review.deleteReply('12345').should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return review.deleteReply('12345').should.eventually.deep.equal({  statusCode: '200 OK'});
      });
    });
  });

  describe('when the promises are rejected', function () {
    var review;
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

      review = new Review(request);

      done();
    });

    //var request = require('request-promise');

    describe('get latest reviews function', function () {
      it('is rejected', function () {
        return review.getLatest().should.be.rejected;
      });

      it('contains the proper response object', function () {
        return review.getLatest().should.be.rejectedWith(Error);
      });
    });

    describe('get a single review function', function () {
      it('get() is rejected', function () {
        return review.get('12345').should.be.rejected;
      });

      it('contains the proper response object', function () {
        return review.get('12345').should.be.rejectedWith(Error);
      });
    });

    describe('get a single private review function', function () {
      it('getPrivate() is rejected', function () {
        return review.getPrivate('12345').should.be.rejected;
      });

      it('contains the proper response object', function () {
        return review.getPrivate('12345').should.be.rejectedWith(Error);
      });
    });

    describe('get a single review\'s web links function', function () {
      it('getWebLinks() is rejected', function () {
        return review.getWebLinks('12345').should.be.rejected;
      });

      it('contains the proper response object', function () {
        return review.getWebLinks('12345').should.be.rejectedWith(Error);
      });
    });

    describe('get a single review\'s likes function', function () {
      it('getLikes() is rejected', function () {
        return review.getLikes('12345').should.be.rejected;
      });

      it('contains the proper response object', function () {
        return review.getLikes('12345').should.be.rejectedWith(Error);
      });
    });

    describe('get a single review\'s tags function', function () {
      it('getTags() is rejected', function () {
        return review.getTags('12345').should.be.rejected;
      });

      it('contains the proper response object', function () {
        return review.getTags('12345').should.be.rejectedWith(Error);
      });
    });

    describe('save a single review\'s tags function', function () {
      it('saveTags() is rejected', function () {
        return review.saveTags('12345').should.be.rejected;
      });

      it('contains the proper response object', function () {
        return review.saveTags('12345').should.be.rejectedWith(Error);
      });
    });

    describe('save a single review\'s reply function', function () {
      it('reply() is rejected', function () {
        return review.reply('12345').should.be.rejected;
      });

      it('contains the proper response object', function () {
        return review.reply('12345').should.be.rejectedWith(Error);
      });
    });

    describe('delete a single review\'s function', function () {
      it('deleteReply() is rejected', function () {
        return review.deleteReply('12345').should.be.rejected;
      });

      it('contains the proper response object', function () {
        return review.deleteReply('12345').should.be.rejectedWith(Error);
      });
    });
  });

  describe('when functions with required params are called', function () {
    var review = new Review('unnecessary for this test');
    describe('when get() is called without a reviewId', function () {
      it('throws a new Error', function () {
        expect(review.get).to.throw(Error);
      });
    });

    describe('when getPrivate() is called without a reviewId', function () {
      it('throws a new Error', function () {
        expect(review.getPrivate).to.throw(Error);
      });
    });

    describe('when getWebLinks() is called without a reviewId', function () {
      it('throws a new Error', function () {
        expect(review.getWebLinks).to.throw(Error);
      });
    });

    describe('when getLikes() is called without a reviewId', function () {
      it('throws a new Error', function () {
        expect(review.getLikes).to.throw(Error);
      });
    });

    describe('when getTags() is called without a reviewId', function () {
      it('throws a new Error', function () {
        expect(review.getTags).to.throw(Error);
      });
    });

    describe('when saveTags() is called without a reviewId', function () {
      it('throws a new Error', function () {
        expect(review.saveTags).to.throw(Error);
      });
    });

    describe('when reply() is called without a reviewId', function () {
      it('throws a new Error', function () {
        expect(review.reply).to.throw(Error);
      });
    });

    describe('when deleteReply() is called without a reviewId', function () {
      it('throws a new Error', function () {
        expect(review.deleteReply).to.throw(Error);
      });
    });
  });
});
