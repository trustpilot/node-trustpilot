'use strict';

let rp = require('request-promise');

class Request {
  constructor (accessProvider) {
    this.accessProvider = accessProvider;
  }

  createRequestOptions (obj) {
    let options = {
      headers: {
        apiKey: this.accessProvider.apiKey
      }
    };

    let newOptions = Object.assign(options, obj);

    return newOptions;
  }

  get (endpoint, options) {
    let params = this.createRequestOptions(options);

    return rp(`${this.accessProvider.host}${endpoint}`, params).then(function (response) {
      return JSON.parse(response);
    });
  }

  getPrivate (endpoint, options) {
    options = options || {};

    return this.accessProvider.generateToken().then((responseToken) => {
      options.headers = {
        authorization: `Bearer ${responseToken}`
      };

      return this.get(endpoint, options);
    });
  }
}

module.exports = Request;
