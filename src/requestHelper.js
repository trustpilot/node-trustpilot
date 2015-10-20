'use strict';

let rp = require('request-promise');

class Request {
  constructor (accessProvider) {
    this.accessProvider = accessProvider;
  }

  /**
   * [returns a promise, fulfilled with object of request options to use]
   * @param  {[boolean]} requiresToken [required boolean if the request needs an Oauth access token]
   * @param {[Object]} queryObj [options object]
   * @param {[string]} methodType [type of the request e.g. 'GET', 'POST']
   * @return {[Object]}      [returns a options object]
   */
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

  /**
   * [makes a request to the given enpoint with options.]
   * @param  {[string]} endpoint      [endpoint to hit - no need for the host]
   * @param  {[boolean]} requiresToken [boolean if the request needs an Oauth token]
   * @param  {[object]} options       [object of additional query options or post body]
   * @param  {[string]} method        [type of method e.g. 'GET', 'POST', 'PUT']
   * @return {[object]}               [returns the api response object]
   */
  request (endpoint, requiresToken, options, method) {
    return this.buildRequestOptions(requiresToken, options, method)
      .then(requestOptions => rp(`${this.accessProvider.host}${endpoint}`, requestOptions))
      .then(responseBody => responseBody);
  }

  /**
   * [makes a GET request to the given enpoint with options.]
   * @param  {[string]} endpoint      [endpoint to hit - no need for the host]
   * @param  {[boolean]} requiresToken [boolean if the request needs an Oauth token]
   * @param  {[object]} options       [object of additional query options or post body]
   * @return {[object]}               [returns the request promise]
   */
  get (endpoint, requiresToken, options) {
    return this.request(endpoint, requiresToken, options, 'GET');
  }

  /**
    * [makes a POST request to the given enpoint with options.]
    * @param  {[string]} endpoint      [endpoint to hit - no need for the host]
    * @param  {[object]} postData       [object of post body]
    * @return {[object]}               [returns the request promise]
   */
  post (endpoint, postData) {
    return this.request(endpoint, true, postData, 'POST');
  }

  //TODO: so the invitations api has a different host name than all the other endpoints. I didn't know this. This is a
  //quick solution so as to move forward. REFACTOR this to work with  the current post request methods
  invitationsRequest (endpoint, requiresToken, options, method) {
    let invitationsHost = this.accessProvider.host.slice(0, 8) + 'invitations-' + this.accessProvider.host.slice(8);

    return this.buildRequestOptions(requiresToken, options, method)
      .then(requestOptions => rp(`${invitationsHost}${endpoint}`, requestOptions))
      .then(responseBody => responseBody);
  }

  delete (endpoint) {
    return this.request(endpoint, true, {}, 'DELETE');
  }
}

module.exports = Request;
