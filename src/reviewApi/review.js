'use strict';
class Review {
  constructor (request) {
    this.request = request;
  }

  /**
   * [returns all the latest reviews]
   * @param  {[string]} lang [required string for the language of reviews]
   * @param {[Object]} options [options object]
   * @param {[string]} options.locale [used to create links using this locale]
   * @param {[number]} options.count [The number of reviews to retrieve]
   * @param {[boolean]} options.filterUsersWithoutImages [Used to filter reviews with users that they do not have an image.]
   * @return {[Object]}      [returns a reviews object]
   */
  getLatest (lang, options) {

    let queryOptions = {
      qs: options || {}
    };

    queryOptions.qs.language = lang || 'en';

    return this.request.get(`/v1/reviews/latest`, queryOptions);
  }

  /**
   * [get a single review by reviewsId]
   * @param  {[string]} reviewId [the reviewId of the review you wish to get]
   * @return {[array]}          [array which holds an object of the review]
   */
  get (reviewId) {
    return this.request.get(`/v1/reviews/${reviewId}`);
  }

  /**
   * [Gets the links to a review's public page on Trustpilot]
   * @param {[string]} reviewId [The id of the review]
   * @param {[Object]} options [options object]
   * @param {[string]} options.locale [the Locale to use when generating web links]
   * @return {[object]}
   */
  getWebLinks (reviewId, options) {

    let queryOptions = {
      qs: {
        locale: options.locale || 'en-US'
      }
    };

    return this.request.get(`/v1/reviews/${reviewId}/web-links`, queryOptions);
  }

  /**
   * [This method gets a review's likes information]
   * @param {[string]} reviewId [The id of the review]
   * @return {[object]} [a likes object]
   */
  getLikes (reviewId) {
    return this.request.get(`/v1/reviews/${reviewId}/likes`);
  }

  /**
   * [This method gets a review's likes information]
   * @param {[string]} reviewId [The id of the review]
   * @return {[object]} [a likes object]
   */
  getTags (reviewId) {
    return this.request.getPrivate(`/v1/private/reviews/${reviewId}/tags`);
  }

}

module.exports = Review;
