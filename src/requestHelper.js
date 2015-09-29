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
    let params = this.createRequestOptions(options);

    return this.accessProvider.generateToken().then((responseToken) => {
      params.headers.authorization = `Bearer ${responseToken}`;

      return rp(`${this.accessProvider.host}${endpoint}`, params).then((response) => {
        return JSON.parse(response);
      });
    });
  }
}

module.exports = Request;
