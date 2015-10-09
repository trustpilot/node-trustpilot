'use strict';

let request = require('request-promise');

class AccessProvider {
  constructor (apiKey, host, secret) {
    this.apiKey = apiKey;
    this.host = host;
    this.secret = secret;
  }

  /**
   * [generates an Oauth object]
   * @return {[Object]}  [Oauth authorization object]
   */
  generateTokenObject () {
    return request({
      baseUrl: this.host,
      uri: '/v1/oauth/system-users/token',
      method: 'POST',
      json: true,
      headers: {
        Authorization: 'Basic ' + new Buffer(this.apiKey + ':' + this.secret).toString('base64'),
        'X-Access': new Buffer('{type: "Full"}').toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    })
    .then((response) => {
      this.authorization = response;
      return this.authorization;
    })
    .catch(function (error) {
      throw new Error(error);
    });
  }

  /**
   * [get the access_token -> if not present, it asks for a new token and returns the access_token]
   * @return {[string]} [Oauth access token]
   */
  getAccessToken () {
    return new Promise((resolve, reject) => {

      if (this.isTokenValid()) {
        resolve(this.authorization.access_token);
      } else {
        this.generateTokenObject().then((response) => {
          resolve(response.access_token);
        });
      }
    });
  }

  /**
   * [checks if the current access_token is valid]
   * @return {[boolean]} [boolean as to whether current access_token is valid]
   */
  isTokenValid () {
    if (!this.authorization) {
      return false;
    }

    let shouldExpireBy = parseInt(this.authorization.issued_at) + parseInt(this.authorization.expires_in);
    let now = new Date().getTime();

    if (now > (shouldExpireBy - 3600)) {
      delete this.authorization;
      return false;
    }

    return true;
  }
}

module.exports = AccessProvider;