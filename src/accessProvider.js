'use strict';

const rp = require('request-promise');

class AccessProvider {
  constructor(apiKey, secret, username, password, baseUrl, tokenRequest) {
    this.apiKey = apiKey;
    this.secret = secret;
    this.username = username;
    this.password = password;
    this.host = baseUrl;
    this.tokenHost = baseUrl && baseUrl.replace(/https:\/\/invitations-api\./, 'https://api.');
    this.tokenRequest = tokenRequest || {
      uri: '/v1/oauth/oauth-business-users-for-applications/accesstoken',
      form: {
        'grant_type': 'password',
        username: this.username,
        password: this.password
      }
    };
  }

  /**
   * [generates an Oauth object]
   * @return {[Object]}  [Oauth authorization object]
   */
  generateTokenObject() {
    return rp.defaults({
      baseUrl: this.tokenHost,
      json: true,
      auth: {
        user: this.apiKey,
        pass: this.secret
      }
    }).post(this.tokenRequest)
    .then((response) => {
      this.authorization = response;
      return this.authorization;
    })
    .catch((error) => {
      throw new Error(error);
    });
  }

  /**
   * [get the access_token -> if not present, it asks for a new token and returns the access_token]
   * @return {[string]} [Oauth access token]
   */
  getAccessToken() {
    return new Promise((resolve, reject) => {

      if (this.isTokenValid()) {
        resolve(this.authorization.access_token);
      } else {
        // Make sure there's only ever one token request in flight
        this.tokenPromise = this.tokenPromise || this.generateTokenObject();
        this.tokenPromise
          .then((response) => {
            resolve(response.access_token);
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  }

  /**
   * [checks if the current access_token is valid]
   * @return {[boolean]} [boolean as to whether current access_token is valid]
   */
  isTokenValid() {
    if (!this.authorization) {
      return false;
    }

    const shouldExpireBy = parseInt(this.authorization.issued_at) + parseInt(this.authorization.expires_in);
    const now = new Date().getTime();

    if (now > (shouldExpireBy - 3600)) {
      delete this.authorization;
      delete this.tokenPromise;
      return false;
    }

    return true;
  }
}

module.exports = AccessProvider;
