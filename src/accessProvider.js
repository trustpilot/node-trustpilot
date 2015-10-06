'use strict';

let request = require('request-promise');

class AccessProvider {
  constructor (apiKey, host, secret) {
    this.apiKey = apiKey;
    this.host = host;
    this.secret = secret;
  }

  //generates a new new oauth token object only if there is no generateTokenPromise set
  //returns just the access_token
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
      }).then((response) => {
        this.authorization = response;
      return this.authorization;
      });
    }

  //returns the access_token -> if not present, it asks for a new token and returns the access_token
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

      }

    });
  }

  refreshToken (waitTime) {
    setTimeout(() => {
      delete this.generateTokenPromise;
      this.generateToken();
    }, waitTime);
  }
}

module.exports = AccessProvider;
