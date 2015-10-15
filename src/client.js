'use strict';

let Review = require('./reviewApi/review');
let Resources = require('./resourcesApi/resources');
let AccessProvider = require('./AccessProvider');
let Request = require('./requestHelper');
let ProductReview = require('./productReviewApi/productReview');
let Invitation = require('./invitationApi/invitation');
let Consumer = require('./consumerApi/consumer');

class Client {
  constructor (apiKey, secret) {
    this.apiKey = apiKey;
    this.host = 'https://api.tp-staging.com';
    this.secret = secret;
    this.accessProvider = new AccessProvider(this.apiKey, this.host, this.secret);
    this.request = new Request(this.accessProvider);
    this.review = new Review(this.request);
    this.resources = new Resources(this.request);
    this.productReview = new ProductReview(this.request);
    this.invitation = new Invitation(this.request);
    this.consumer = new Consumer(this.request);
  }
}

module.exports = Client;
