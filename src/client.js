'use strict';

const Review = require('./reviewApi/review');
const Resources = require('./resourcesApi/resources');
const AccessProvider = require('./accessProvider');
const Request = require('./requestHelper');
const ProductReview = require('./productReviewApi/productReview');
const Invitation = require('./invitationApi/invitation');
const Consumer = require('./consumerApi/consumer');
const Categories = require('./categoriesApi/categories');
const BusinessUnit = require('./businessUnitApi/businessUnit');

class Trustpilot {
  constructor(config) {
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
