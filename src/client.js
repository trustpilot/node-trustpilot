'use strict';

const AccessProvider = require('./accessProvider');
const Request = require('./requestHelper');

class Trustpilot {
  constructor(config) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || 'https://api.trustpilot.com';
    this.secret = config.secret || '';
    this.username = config.username;
    this.password = config.password;
    this.accessProvider = new AccessProvider(this.apiKey, this.secret, this.username, this.password, this.baseUrl);
    this.request = new Request(this.accessProvider);
  }
}

module.exports = Trustpilot;
