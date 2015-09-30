'use strict';

class ReviewGetEndpoints {
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
  latest (lang, options) {
    let queryOptions = {
      qs: options || {}
    };

    queryOptions.qs.language = lang || 'en';

    return this.request.get(`/v1/reviews/latest`, queryOptions);
  }

  /**
   * [get a single review by reviewsId]
   * @param  {[string]} reviewId [the reviewId of the review you wish to get]
   * @return {[object]}          [object of the review]
   */
  single (reviewId) {
    return this.request.get(`/v1/reviews/${reviewId}`);
  }

  /**
   * [This method gets the reviews's basic public information but also some private information
   * (referenceEmail and referenceId) and status as either 'active' or 'reported'.]
   * @param {[string]} reviewId [the reviewId of the review you wish to get]
   * @return {[object]} [object of the review]
   */
  singlePrivate (reviewId) {
    return this.request.getPrivate(`/v1/private/reviews/${reviewId}`);
  }

  /**
   * [Gets the links to a review's public page on Trustpilot]
   * @param {[string]} reviewId [The id of the review]
   * @param {[Object]} options [options object]
   * @param {[string]} options.locale [the Locale to use when generating web links]
   * @return {[object]}
   */
  singleWebLinks (reviewId, options) {

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
  singleLikes (reviewId) {
    return this.request.get(`/v1/reviews/${reviewId}/likes`);
  }

  tags (reviewId) {
    return this.request.getPrivate(`/v1/private/reviews/${reviewId}/tags`);
  }
}

module.exports = ReviewGetEndpoints;
