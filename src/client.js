'use strict';

let Review = require('./reviewApi/review');

class Client {
  constructor (apiKey) {
    this.apiKey = apiKey;
    this.host = 'https://api.tp-staging.com/';
    this.review = new Review(this.apiKey, this.host);
  }

}

module.exports = Client;
