'use strict';
let request = require('request-promise');

class AccessProvider {
  constructor (apiKey, secret, username, password, host) {
    this.apiKey = apiKey;
    this.secret = secret;
    this.username = username;
    this.password = password;
    this.host = host;
  }

  /**
   * [generates an Oauth object]
   * @return {[Object]}  [Oauth authorization object]
   */
  generateTokenObject () {
    return request({
      baseUrl: this.host,
      uri: '/v1/oauth/oauth-business-users-for-applications/accesstoken',
      method: 'POST',
      json: true,
      headers: {
        Authorization: 'Basic ' + new Buffer(this.apiKey + ':' + this.secret).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: {
        grant_type: 'password',
        username: this.username,
        password: this.password
      }
    })
    .then(response => {
      this.authorization = response;
      return this.authorization;
    })
    .catch(error => {
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
        this.generateTokenObject()
          .then((response) => {
            resolve(response.access_token);
          })
          .catch(error => {
            reject(error);
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
