'use strict';

var BusinessUnit = require('../src/businessUnitApi/businessUnit');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe('BusinessUnit Api ', function () {
  describe('when the promises are fulfilled', function () {
    var businessUnit;
    var request;

    beforeEach(function (done) {
      request = {
        get: function () {
          return Promise.resolve({
            somedata: 'some data that is returned by the api'
          });
        }
      };

      businessUnit = new BusinessUnit(request);

      done();
    });

    afterEach(function () {
      businessUnit = '';
    });

    describe('list business unit function', function () {
      it('is fulfilled', function () {
        return businessUnit.listBusinessUnits().should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return businessUnit.listBusinessUnits().should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });

    describe('find business unit function', function () {
      it('is fulfilled', function () {
        return businessUnit.find().should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return businessUnit.find().should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });

    describe('get business unit function', function () {
      it('is fulfilled', function () {
        return businessUnit.get('123456789').should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return businessUnit.get('123456789').should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });

    describe('get the web links of a business unit function', function () {
      it('is fulfilled', function () {
        return businessUnit.getWebLinks('123456789').should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return businessUnit.getWebLinks('123456789').should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });

    describe('get the reviews of a business unit function', function () {
      it('is fulfilled', function () {
        return businessUnit.getReviews('123456789').should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return businessUnit.getReviews('123456789').should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });

    describe('get the private reviews of a business unit function', function () {
      it('is fulfilled', function () {
        return businessUnit.getPrivateReviews('123456789').should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return businessUnit.getPrivateReviews('123456789').should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });

    describe('get the tags of a business unit function', function () {
      it('is fulfilled', function () {
        return businessUnit.getPrivateTags('123456789').should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return businessUnit.getPrivateTags('123456789').should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });

    describe('list the categories of a business unit function', function () {
      it('is fulfilled', function () {
        return businessUnit.listCategories('123456789').should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return businessUnit.listCategories('123456789').should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });
  });

  describe('when the promises are rejected', function () {
    var businessUnit;
    var request;

    beforeEach(function (done) {
      request = {
        get: function () {
          return Promise.reject(new Error());
        }
      };

      businessUnit = new BusinessUnit(request);

      done();
    });

    describe('list business units function', function () {
      it('is rejected', function () {
        return businessUnit.listBusinessUnits().should.be.rejected;
      });

      it('contains the proper response object', function () {
        return businessUnit.listBusinessUnits().should.be.rejectedWith(Error);
      });
    });

    describe('find business unit function', function () {
      it('is rejected', function () {
        return businessUnit.find().should.be.rejected;
      });

      it('contains the proper response object', function () {
        return businessUnit.find().should.be.rejectedWith(Error);
      });
    });

    describe('get business unit function', function () {
      it('is rejected', function () {
        return businessUnit.get('123456789').should.be.rejected;
      });

      it('contains the proper response object', function () {
        return businessUnit.get('123456789').should.be.rejectedWith(Error);
      });
    });

    describe('get the web links of a business unit function', function () {
      it('is rejected', function () {
        return businessUnit.getWebLinks('123456789').should.be.rejected;
      });

      it('contains the proper response object', function () {
        return businessUnit.getWebLinks('123456789').should.be.rejectedWith(Error);
      });
    });

    describe('get the reviews of a business unit function', function () {
      it('is rejected', function () {
        return businessUnit.getReviews('123456789').should.be.rejected;
      });

      it('contains the proper response object', function () {
        return businessUnit.getReviews('123456789').should.be.rejectedWith(Error);
      });
    });

    describe('get the private reviews of a business unit function', function () {
      it('is rejected', function () {
        return businessUnit.getPrivateReviews('123456789').should.be.rejected;
      });

      it('contains the proper response object', function () {
        return businessUnit.getPrivateReviews('123456789').should.be.rejectedWith(Error);
      });
    });

    describe('get the private tags of a business unit function', function () {
      it('is rejected', function () {
        return businessUnit.getPrivateTags('123456789').should.be.rejected;
      });

      it('contains the proper response object', function () {
        return businessUnit.getPrivateTags('123456789').should.be.rejectedWith(Error);
      });
    });

    describe('list the categories of a business unit function', function () {
      it('is rejected', function () {
        return businessUnit.listCategories('123456789').should.be.rejected;
      });

      it('contains the proper response object', function () {
        return businessUnit.listCategories('123456789').should.be.rejectedWith(Error);
      });
    });
  });

  describe('when functions with required params are called', function () {
    var businessUnit;

    beforeEach(function () {
      businessUnit = new BusinessUnit('unnecessary for this test');
    });

    afterEach(function () {
      businessUnit = '';
    });

    describe('when get() is called without a businessUnitId', function () {
      it('throws a new Error', function () {
        expect(function () {
          businessUnit.get();
        }).to.throw('businessUnitId is not present');
      });
    });

    describe('when getWebLinks() is called without a businessUnitId', function () {
      it('throws a new Error', function () {
        expect(function () {
          businessUnit.getWebLinks();
        }).to.throw('businessUnitId is not present');
      });
    });

    describe('when getReviews() is called without a businessUnitId', function () {
      it('throws a new Error', function () {
        expect(function () {
          businessUnit.getReviews();
        }).to.throw('businessUnitId is not present');
      });
    });

    describe('when getPrivateReviews() is called without a businessUnitId', function () {
      it('throws a new Error', function () {
        expect(function () {
          businessUnit.getPrivateReviews();
        }).to.throw('businessUnitId is not present');
      });
    });

    describe('when getPrivateTags() is called without a businessUnitId', function () {
      it('throws a new Error', function () {
        expect(function () {
          businessUnit.getPrivateTags();
        }).to.throw('businessUnitId is not present');
      });
    });

    describe('when listCategories() is called without a businessUnitId', function () {
      it('throws a new Error', function () {
        expect(function () {
          businessUnit.listCategories();
        }).to.throw('businessUnitId is not present');
      });
    });
  });
});
