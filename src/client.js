'use strict';

const AccessProvider = require('./accessProvider');
const RequestHelper = require('./requestHelper');

class Trustpilot {
  constructor(config) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || 'https://api.trustpilot.com';
    this.secret = config.secret || '';
    this.username = config.username;
    this.password = config.password;
    this.tokenRequest = config.tokenRequest;

    const accessProvider = new AccessProvider(this.apiKey, this.secret, this.username, this.password,
      this.baseUrl, this.tokenRequest);
    const requestHelper = new RequestHelper(accessProvider);

    this.apiRequest = requestHelper.apiRequest;
    this.authenticate = () => {
      return requestHelper.buildAuthenticatedRequest();
    };
  }
}

module.exports = Trustpilot;
