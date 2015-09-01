'use strict';

import Review from './reviewApi/review';

export default class Client {
  constructor (apiKey) {
    this.apiKey = apiKey;
    this.host = 'https://api.tp-staging.com/';
    this.review = new Review(this.apiKey, this.host);
  }

}
