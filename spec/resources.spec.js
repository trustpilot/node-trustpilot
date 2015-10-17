'use strict';

var Resource = require('../src/resourcesApi/resources');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe('Resources Api', function () {
  describe('when all promises are fulfilled', function () {
    var resource;
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

      resource = new Resource(request);

      done();
    });

    describe('getImageNavigationalLinks function', function () {
      it('is fulfilled', function () {
        return resource.getImageNavigationalLinks().should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return resource.getImageNavigationalLinks().should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });

    describe('getStarImages function', function () {
      it('is fulfilled', function () {
        return resource.getStarImages().should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return resource.getStarImages().should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });

    describe('getLogoImages function', function () {
      it('is fulfilled', function () {
        return resource.getLogoImages().should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return resource.getLogoImages().should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });

    describe('getTrustpilotIconImages function', function () {
      it('is fulfilled', function () {
        return resource.getTrustpilotIconImages().should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return resource.getTrustpilotIconImages().should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });

    describe('getSupportedLocales function', function () {
      it('is fulfilled', function () {
        return resource.getSupportedLocales().should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return resource.getSupportedLocales().should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });

    describe('getKnownCountries function', function () {
      it('is fulfilled', function () {
        return resource.getKnownCountries().should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return resource.getKnownCountries().should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });

    describe('getStringRepresentationOfStars function', function () {
      it('is fulfilled', function () {
        return resource.getStringRepresentationOfStars().should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return resource.getStringRepresentationOfStars().should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });
  });

  describe('when promises are rejected', function () {
    var resource;
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

      resource = new Resource(request);

      done();
    });

    describe('getImageNavigationalLinks', function () {
      it('is rejected', function () {
        return resource.getImageNavigationalLinks().should.be.rejected;
      });

      it('contains the proper response object', function () {
        return resource.getImageNavigationalLinks().should.be.rejectedWith(Error);
      });
    });

    describe('getStarImages', function () {
      it('is rejected', function () {
        return resource.getStarImages().should.be.rejected;
      });

      it('contains the proper response object', function () {
        return resource.getStarImages().should.be.rejectedWith(Error);
      });
    });

    describe('getLogoImages', function () {
      it('is rejected', function () {
        return resource.getLogoImages().should.be.rejected;
      });

      it('contains the proper response object', function () {
        return resource.getLogoImages().should.be.rejectedWith(Error);
      });
    });

    describe('getTrustpilotIconImages', function () {
      it('is rejected', function () {
        return resource.getTrustpilotIconImages().should.be.rejected;
      });

      it('contains the proper response object', function () {
        return resource.getTrustpilotIconImages().should.be.rejectedWith(Error);
      });
    });

    describe('getSupportedLocales', function () {
      it('is rejected', function () {
        return resource.getSupportedLocales().should.be.rejected;
      });

      it('contains the proper response object', function () {
        return resource.getSupportedLocales().should.be.rejectedWith(Error);
      });
    });

    describe('getKnownCountries', function () {
      it('is rejected', function () {
        return resource.getKnownCountries().should.be.rejected;
      });

      it('contains the proper response object', function () {
        return resource.getKnownCountries().should.be.rejectedWith(Error);
      });
    });

    describe('getStringRepresentationOfStars', function () {
      it('is rejected', function () {
        return resource.getStringRepresentationOfStars().should.be.rejected;
      });

      it('contains the proper response object', function () {
        return resource.getStringRepresentationOfStars().should.be.rejectedWith(Error);
      });
    });
  });
});
