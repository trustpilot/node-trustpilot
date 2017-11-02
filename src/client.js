'use strict';

const AccessProvider = require('./accessProvider');
const RequestHelper = require('./requestHelper');

class Trustpilot {
  constructor({ apiKey, baseUrl = 'https://api.trustpilot.com', secret = '', username, password, tokenRequest, accessToken }) {
    const accessProvider = new AccessProvider(apiKey, secret, username, password, baseUrl, tokenRequest, accessToken);
    this.requestHelper = new RequestHelper(accessProvider);
  }

  get apiRequest() {
    return this.requestHelper.apiRequest;
  }

  authenticate() {
    return this.requestHelper.buildAuthenticatedRequest();
  }
}

module.exports = Trustpilot;
