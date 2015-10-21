'use strict';

var Invitation = require('../src/invitationApi/invitation');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe('Invitations Api ', function () {
  describe('when the promises are fulfilled', function () {
    var invitation;
    var request;

    beforeEach(function (done) {
      request = {
        invitationsRequest: function () {
          return Promise.resolve({
            somedata: 'some data that is returned by the api'
          });
        }
      };

      invitation = new Invitation(request);

      done();
    });

    //var request = require('request-promise');

    describe('new invitation function', function () {
      it('is fulfilled', function () {
        return invitation.newInvitation('123456').should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return invitation.newInvitation('123456789').should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });

    describe('get templates function', function () {
      it('is fulfilled', function () {
        return invitation.getTemplates('123456').should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return invitation.getTemplates('123456789').should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });

    describe('generate service review links function', function () {
      it('is fulfilled', function () {
        return invitation.generateServiceReviewLink('123456').should.be.fulfilled;
      });

      it('contains the proper response object', function () {
        return invitation.generateServiceReviewLink('123456789').should.eventually.deep.equal({somedata: 'some data that is returned by the api'});
      });
    });
  });

  describe('when the promises are rejected', function () {
    var invitation;
    var request;

    beforeEach(function (done) {
      request = {
        invitationsRequest: function () {
          return Promise.reject(new Error());
        }
      };

      invitation = new Invitation(request);

      done();
    });

    describe('new invitations function', function () {
      it('is rejected', function () {
        return invitation.newInvitation('123456798').should.be.rejected;
      });

      it('contains the proper response object', function () {
        return invitation.newInvitation('123456798').should.be.rejectedWith(Error);
      });
    });

    describe('get templetes function', function () {
      it('is rejected', function () {
        return invitation.getTemplates('123456798').should.be.rejected;
      });

      it('contains the proper response object', function () {
        return invitation.getTemplates('123456798').should.be.rejectedWith(Error);
      });
    });

    describe('generateServiceReviewLink function', function () {
      it('is rejected', function () {
        return invitation.generateServiceReviewLink('123456798').should.be.rejected;
      });

      it('contains the proper response object', function () {
        return invitation.generateServiceReviewLink('123456798').should.be.rejectedWith(Error);
      });
    });
  });

  describe('when functions with required params are called', function () {
    var invitation = new Invitation('unnecessary for this test');

    describe('when newInvitation() is called without a businessUnitId', function () {
      it('throws a new Error', function () {
        expect(function () {
          invitation.newInvitation();
        }).to.throw('businessUnitId is not present');
      });
    });

    describe('when getTemplates() is called without a businessUnitId', function () {
      it('throws a new Error', function () {
        expect(function () {
          invitation.getTemplates();
        }).to.throw('businessUnitId is not present');
      });
    });

    describe('when generateServiceReviewLink() is called without a businessUnitId', function () {
      it('throws a new Error', function () {
        expect(function () {
          invitation.generateServiceReviewLink();
        }).to.throw('businessUnitId is not present');
      });
    });
  });
});
