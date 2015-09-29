'use strict';

let rp = require('request-promise');

class Request {
  constructor (accessProvider) {
    this.accessProvider = accessProvider;
  }

  //creates options {obj} to append to every request. Adds an apikey and then any additional params to request
  createRequestOptions (obj) {
    let options = {
      headers: {
        apiKey: this.accessProvider.apiKey
      }
    };

    let newOptions = Object.assign(options, obj);

    return newOptions;
  }

  //makes a get request to the given enpoint
  get (endpoint, options) {
    let params = this.createRequestOptions(options);

    return rp(`${this.accessProvider.host}${endpoint}`, params).then(function (response) {
      return JSON.parse(response);
    });
  }

  //get request to the private apis, so an OAuth token is added to the request
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
