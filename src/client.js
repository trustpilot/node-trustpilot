'use strict';

let Review = require('./reviewApi/review');
let AccessProvider = require('./AccessProvider');

class Client {
  constructor (apiKey, secret) {
    this.apiKey = apiKey;
    this.host = 'https://api.tp-staging.com';
    this.secret = secret;
    this.accessProvider = new AccessProvider(this.apiKey, this.host, this.secret);
    this.review = new Review(this.accessProvider);

  }
}

module.exports = Client;
