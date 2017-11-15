'use strict';

const AccessProvider = require('./accessProvider');
const RequestHelper = require('./requestHelper');

class Trustpilot {
  constructor({ apiKey, baseUrl = 'https://api.trustpilot.com', secret = '', username, password, tokenRequest, accessToken }) {
    const accessProvider = new AccessProvider(apiKey, secret, username, password, baseUrl, tokenRequest, accessToken);
    this.requestHelper = new RequestHelper(accessProvider);

    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.secret = secret;
    this.username = username;
    this.password = password;
    this.tokenRequest = tokenRequest;
  }

  get apiRequest() {
    return this.requestHelper.apiRequest;
  }

  authenticate() {
    return this.requestHelper.buildAuthenticatedRequest();
  }
}

module.exports = Trustpilot;
