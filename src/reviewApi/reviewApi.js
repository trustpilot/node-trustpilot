'use strict';

let ReviewGetEndpoints = require('./reviewGetEndpoints');

class ReviewApi {
  constructor (request) {
    this.get = new ReviewGetEndpoints(request);
  }
}

module.exports = ReviewApi;
