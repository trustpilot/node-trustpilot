'use strict';
class Review {
  constructor (request) {
    this.request = request;
  }

  /**
   * [returns all the latest reviews]
   * {@link https://developers.trustpilot.com/review-api#get-latest-reviews-by-language}
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
   * {@link https://developers.trustpilot.com/review-api#get-a-review}
   * @param  {[string]} reviewId [the reviewId of the review you wish to get]
   * @return {[array]}          [array which holds an object of the review]
   */
  get (reviewId) {
    if (!reviewId) { throw new Error('reviewId is not present'); }

    return this.request.get(`/v1/reviews/${reviewId}`, false);
  }

  /**
   * [get a single review by reviewsId]
   * {@link https://developers.trustpilot.com/review-api#get-private-review}
   * @param  {[string]} reviewId [required. the reviewId of the review you wish to get]
   * @return {[array]}          [array which holds an object of the review]
   */
  getPrivate (reviewId) {
    if (!reviewId) { throw new Error('reviewId is not present'); }

    return this.request.get(`/v1/private/reviews/${reviewId}`, true);
  }

  /**
   * [Gets the links to a review's public page on Trustpilot]
   * {@link https://developers.trustpilot.com/review-api#get-a-review's-web-links}
   * @param {[string]} reviewId [required. The id of the review]
   * @param {[Object]} options [options object]
   * @param {[string]} options.locale [the Locale to use when generating web links]
   * @return {[object]}
   */
  getWebLinks (reviewId, locale) {
    if (!reviewId) { throw new Error('reviewId is not present'); }

    //set locale
    let queryOptions = {
      locale: locale || 'en-US'
    };

    return this.request.get(`/v1/reviews/${reviewId}/web-links`, false, queryOptions);
  }

  /**
   * [This method gets a review's likes information]
   * {@link https://developers.trustpilot.com/review-api#get-a-review's-likes}
   * @param {[string]} reviewId [required. The id of the review]
   * @return {[object]} [a likes object]
   */
  getLikes (reviewId) {
    if (!reviewId) { throw new Error('reviewId is not present'); }

    return this.request.get(`/v1/reviews/${reviewId}/likes`, false);
  }

  /**
   * [This method gets a review's likes information]
   * {@link https://developers.trustpilot.com/review-api#get-tags-on-review}
   * @param {[string]} reviewId [required. The id of the review]
   * @return {[object]} [a likes object]
   */
  getTags (reviewId) {
    if (!reviewId) { throw new Error('reviewId is not present'); }

    return this.request.get(`/v1/private/reviews/${reviewId}/tags`, true);
  }

/**
 * [This method will set the tags of a service review.]
 * {@link https://developers.trustpilot.com/review-api#set-tags-on-review}
 * @param {[string]} reviewId [The id of the review]
 * @param {[Object]} postData [object of post data]
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
    if (!reviewId) { throw new Error('reviewId is not present'); }

    return this.request.post(`/v1/private/reviews/${reviewId}/tags`, postData);
  }

  /**
   * [This method will post a reply to a review.]
   * {@link https://developers.trustpilot.com/review-api#reply-to-a-review.}
   * @param {[string]} reviewId [The if of the review]
   * @param {[object]} postData [object containing the reply message]
   * @example
   * {
      message: 'Reply message'
      }
   */
  reply (reviewId, postData) {
    if (!reviewId) { throw new Error('reviewId is not present'); }

    return this.request.post(`/v1/private/reviews/${reviewId}/reply`, postData);
  }

  /**
   * [This method will delete a reply to a review.]
   * {@link https://developers.trustpilot.com/review-api#Delete a reply to a review.}
   * @param {[string]} reviewId [The if of the review]
   */
  deleteReply (reviewId) {
    if (!reviewId) { throw new Error('reviewId is not present'); }

    return this.request.delete(`/v1/private/reviews/${reviewId}/reply`);
  }

}

module.exports = Review;
