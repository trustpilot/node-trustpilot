'use strict';

let rp = require('request-promise');

class Request {
  constructor (accessProvider) {
    this.accessProvider = accessProvider;
  }

  //creates options {obj} to append to every request. Adds an apikey and then any additional params to request
  buildRequestOptions (requiresToken, queryObj, method) {
    return new Promise((resolve, reject) => {

      //if requiresToken, then get an acccessToken before resolving - else resolve with apiKey
      if (requiresToken) {
        this.accessProvider.getAccessToken()
          .then(responseToken => {
            let requestOptions = {
      headers: {
                authorization: `Bearer ${responseToken}`
              },
              method: method,
              json: true
    };

            //set queryString or request body depending on method type
            if (method === 'GET') {
              requestOptions.qs = queryObj;
            } else {
              requestOptions.body = queryObj;
  }

  //makes a get request to the given enpoint
  get (endpoint, options) {
    let params = this.createRequestOptions(options);

    return rp(`${this.accessProvider.host}${endpoint}`, params).then(function (response) {
      return JSON.parse(response);
            resolve(requestOptions);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        resolve({
          headers: {
            apiKey: this.accessProvider.apiKey
          },
          json: true,
          qs: queryObj
        });
      }
    });
  }

  //get request to the private apis, so an OAuth token is added to the request
  getPrivate (endpoint, options) {
    options = options || {};
    return this.accessProvider.getAccessToken().then((responseToken) => {
      options.headers = {
        authorization: `Bearer ${responseToken}`
      };

      return this.get(endpoint, options);
    });
  }
}

module.exports = Request;
