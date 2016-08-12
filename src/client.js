'use strict';

let Review = require('./reviewApi/review');
let Resources = require('./resourcesApi/resources');
let AccessProvider = require('./accessProvider');
let Request = require('./requestHelper');
let ProductReview = require('./productReviewApi/productReview');
let Invitation = require('./invitationApi/invitation');
let Consumer = require('./consumerApi/consumer');
let Categories = require('./categoriesApi/categories');
let BusinessUnit = require('./businessUnitApi/businessUnit');

class Trustpilot {
  constructor (config) {
    this.apiKey = config.apiKey;
    this.host = config.dev || 'https://api.trustpilot.com';
    this.secret = config.secret || '';
    this.username = config.username;
    this.password = config.password;
    this.accessProvider = new AccessProvider(this.apiKey, this.secret, this.username, this.password, this.host);
    this.request = new Request(this.accessProvider);
    this.review = new Review(this.request);
    this.resources = new Resources(this.request);
    this.productReview = new ProductReview(this.request);
    this.invitation = new Invitation(this.request);
    this.consumer = new Consumer(this.request);
    this.categories = new Categories(this.request);
    this.businessUnit = new BusinessUnit(this.request);
  }
}

module.exports = Trustpilot;
