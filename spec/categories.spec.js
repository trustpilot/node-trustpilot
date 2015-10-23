'use strict';

var Categories = require('../src/categoriesApi/categories');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe('Categories Api ', function () {
  describe('when the promises are fulfilled', function () {
    var categories;
    var request;

    beforeEach(function (done) {
      request = {
        get: function () {
          return Promise.resolve({
            somedata: 'some data that is returned by the api'
          });
        }
      };

      categories = new Categories(request);

      done();
    });

    afterEach(function () {
      categories = '';
    });

    describe('list categories function', function () {
      it('is fulfilled', function () {
        return categories.listCategories('123456').should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return categories.listCategories().should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });

    describe('get specific category function', function () {
      it('is fulfilled', function () {
        return categories.get('123456').should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return categories.get('123456789').should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });

    describe('find specific category function', function () {
      it('is fulfilled', function () {
        return categories.find().should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return categories.find().should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });

    describe('list business units in a specific category function', function () {
      it('is fulfilled', function () {
        return categories.listBusinessUnits('123456').should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return categories.listBusinessUnits('123456789').should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });

    describe('search category function', function () {
      it('is fulfilled', function () {
        return categories.search().should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return categories.search().should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });
  });

  describe('when the promises are rejected', function () {
    var categories;
    var request;

    beforeEach(function (done) {
      request = {
        get: function () {
          return Promise.reject(new Error());
        }
      };

      categories = new Categories(request);

      done();
    });

    describe('list categories consumer function', function () {
      it('is rejected', function () {
        return categories.listCategories().should.be.rejected;
      });

      it('contains the proper response object', function () {
        return categories.listCategories().should.be.rejectedWith(Error);
      });
    });

    describe('get categories function', function () {
      it('is rejected', function () {
        return categories.get('123456').should.be.rejected;
      });

      it('contains the proper response object', function () {
        return categories.get('123456').should.be.rejectedWith(Error);
      });
    });

    describe('find category function', function () {
      it('is rejected', function () {
        return categories.find().should.be.rejected;
      });

      it('contains the proper response object', function () {
        return categories.find().should.be.rejectedWith(Error);
      });
    });

    describe('list business units in a category function', function () {
      it('is rejected', function () {
        return categories.listBusinessUnits('123456').should.be.rejected;
      });

      it('contains the proper response object', function () {
        return categories.listBusinessUnits('123456').should.be.rejectedWith(Error);
      });
    });

    describe('search category function', function () {
      it('is rejected', function () {
        return categories.search().should.be.rejected;
      });

      it('contains the proper response object', function () {
        return categories.search().should.be.rejectedWith(Error);
      });
    });
  });

  describe('when functions with required params are called', function () {
    var categories;

    beforeEach(function () {
      categories = new Categories('unnecessary for this test');
    });

    afterEach(function () {
      categories = '';
    });

    describe('when get() is called without a categoryId', function () {
      it('throws a new Error', function () {
        expect(function () {
          categories.get();
        }).to.throw('categoryId is not present');
      });
    });

    describe('when listBusinessUnits() is called without a categoryId', function () {
      it('throws a new Error', function () {
        expect(function () {
          categories.listBusinessUnits();
        }).to.throw('categoryId is not present');
      });
    });
  });
});
