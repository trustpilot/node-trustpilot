'use strict';

let rp = require('request-promise');

class Request {
  constructor (apiKey) {
    this.apiKey = apiKey;
  }

  createRequestOptions (obj) {
    let options = {
      headers: {
        apiKey: this.apiKey
      }
    };

    let newOptions = Object.assign(options, obj);

    return newOptions;
  }

  get (endpoint, options) {
    let params = this.createRequestOptions(options);

    return rp(endpoint, params).then(function (response) {
      return JSON.parse(response);
    });
  }
}

module.exports = Request;
