'use strict';

let request = require('request-promise');

class AccessProvider {
  constructor (apiKey, host, secret) {
    this.apiKey = apiKey;
    this.host = host;
    this.secret = secret;
    this.getToken = this.generateToken();
  }

  generateToken () {
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
    }).then(function (response) {
      return response.access_token;
    });
  }
}

module.exports = AccessProvider;
