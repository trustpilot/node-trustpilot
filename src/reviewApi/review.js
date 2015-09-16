'use strict';
let Request = require('../requestHelper');
class Review {

  constructor (apiKey, host) {
    this.apiKey = apiKey;
    this.host = host;
    this.request = new Request(this.apiKey, this.host);
  }

  /**
   * [returns all the latest reviews]
   * @param  {[string]} lang [string for the language of reviews]
   * @return {[arry]}      [returns an array of review objects]
   */
  latest (lang) {
    let options = {
      qs: {
        language: lang || 'en'
      }
    };

    return this.request.get(`/v1/reviews/latest`, options);

  }

  /**
   * [get a single review by reviewsId]
   * @param  {[string]} reviewId [the reviewId of the review you wish to get]
   * @return {[array]}          [array which holds an object of the review]
   */
  single (reviewId) {
    return this.request.get(`/v1/reviews/${reviewId}`);
  }

}

module.exports = Review;
