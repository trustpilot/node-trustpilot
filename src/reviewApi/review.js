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

    let queryOptions = options || {};

    //set default language if not provided
    queryOptions.language = lang || 'en';

    return this.request.get(`/v1/reviews/latest`, false, queryOptions);
  }

  /**
   * [get a single review by reviewsId]
   * @param  {[string]} reviewId [the reviewId of the review you wish to get]
   * @return {[array]}          [array which holds an object of the review]
   */
  get (reviewId) {
    return this.request.get(`/v1/reviews/${reviewId}`, false);
  }

  /**
   * [get a single review by reviewsId]
   * @param  {[string]} reviewId [the reviewId of the review you wish to get]
   * @return {[array]}          [array which holds an object of the review]
   */
  getPrivate (reviewId) {
    return this.request.get(`/v1/private/reviews/${reviewId}`, true);
  }

  /**
   * [Gets the links to a review's public page on Trustpilot]
   * @param {[string]} reviewId [The id of the review]
   * @param {[Object]} options [options object]
   * @param {[string]} options.locale [the Locale to use when generating web links]
   * @return {[object]}
   */
  getWebLinks (reviewId, locale) {

    //set locale
    let queryOptions = {
      locale: locale || 'en-US'
    };

    return this.request.get(`/v1/reviews/${reviewId}/web-links`, false, queryOptions);
  }

  /**
   * [This method gets a review's likes information]
   * @param {[string]} reviewId [The id of the review]
   * @return {[object]} [a likes object]
   */
  getLikes (reviewId) {
    return this.request.get(`/v1/reviews/${reviewId}/likes`, false);
  }

  /**
   * [This method gets a review's likes information]
   * @param {[string]} reviewId [The id of the review]
   * @return {[object]} [a likes object]
   */
  getTags (reviewId) {
    return this.request.get(`/v1/private/reviews/${reviewId}/tags`, true);
  }

/**
 * [This method will set the tags of a service review.]
 * @param {[string]} reviewId [The id of the review]
 * @param {[Object]} options [options object]
 * @example
 * {
      tags: [
        {
          group: 'ProductGroup',
          value: 'Computers'
        }
      ]
    }
 */
  saveTags (reviewId, postData) {
    return this.request.post(`/v1/private/reviews/${reviewId}/tags`, postData);
  }

  /**
   * [This method will post a reply to a review.]
   * @param {[string]} reviewId [The if of the review]
   * @param {[object]} postData [object containing the reply message]
   * @example
   * {
      message: 'Reply message'
      }
   */
  reply (reviewId, postData) {
    return this.request.post(`/v1/private/reviews/${reviewId}/reply`, postData);
  }

  /**
   * [This method will delete a reply to a review.]
   * @param {[string]} reviewId [The if of the review]
   */
  deleteReply (reviewId) {
    return this.request.delete(`/v1/private/reviews/${reviewId}/reply`);
  }

}

module.exports = Review;
