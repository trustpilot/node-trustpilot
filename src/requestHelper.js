'use strict';

let rp = require('request-promise');

class Request {
  constructor (accessProvider) {
    this.accessProvider = accessProvider;
  }

  //creates options {obj} to append to every request. Adds an apikey and then any additional params to request
  buildRequestOptions (requiresToken, queryObj, methodType) {
    return new Promise((resolve, reject) => {

      //if requiresToken, then get an acccessToken before resolving - else resolve with apiKey
      if (requiresToken) {
        this.accessProvider.getAccessToken()
          .then(responseToken => {
            let requestOptions = {
              headers: {
                authorization: `Bearer ${responseToken}`
              },
              method: methodType,
              json: true
            };

            //set queryString or request body depending on method type
            if (methodType === 'GET') {
              requestOptions.qs = queryObj;
            } else {
              requestOptions.body = queryObj;
            }

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

  //makes a request to the given enpoint with options.
  request (endpoint, requiresToken, options, method) {
    return this.buildRequestOptions(requiresToken, options, method)
      .then(requestOptions => rp(`${this.accessProvider.host}${endpoint}`, requestOptions))
      .then(responseBody => responseBody)
      .catch(error => { throw new Error(error); });
  }

  //makes a get request to the given enpoint
  get (endpoint, requiresToken, options) {
    return this.request(endpoint, requiresToken, options, 'GET');
  }

  //does a 'POST' to the given endpoint with options object
  post (endpoint, postData) {
    return this.request(endpoint, true, postData, 'POST');
  }
}

module.exports = Request;
