'use strict';

let rp = require('request-promise');

class Request {
  constructor (apiKey, host) {
    this.apiKey = apiKey;
    this.host = host;
  }

  createRequestOptions (obj) {
    let options = {
      headers: {
        apiKey: this.apiKey
      }
    };

    if (obj.token) {
      options.headers.authorization = `Bearer ${obj.token}`;
      delete obj.token;
    }

    let newOptions = Object.assign(options, obj);

    return newOptions;
  }

  get (endpoint, options) {
    let params = this.createRequestOptions(options);

    return rp(`${this.host}${endpoint}`, params).then(function (response) {
      return JSON.parse(response);
    });
  }
}

module.exports = Request;
