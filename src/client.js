'use strict';

let Review = require('./reviewApi/review');
let AccessProvider = require('./AccessProvider');
let Request = require('./requestHelper');

class Client {
  constructor (apiKey, secret) {
    this.apiKey = apiKey;
    this.host = 'https://api.tp-staging.com';
    this.secret = secret;
    this.accessProvider = new AccessProvider(this.apiKey, this.host, this.secret);
    this.request = new Request(this.accessProvider);
    this.review = new Review(this.request);

  }
}

module.exports = Client;
