'use strict';

class Consumer {
  constructor (request) {
    this.request = request;
  }

  /**
   * [This method gets the consumer's public information (name, location, reviews written, etc.).]
   * {@link https://developers.trustpilot.com/consumer-api#Get a consumer}
   * @param {[string]} consumerId [required The id of the consumer.]
   * @return {[object]} [object containing all sorts of info about a specific consumer]
   */
  getConsumer (consumerId) {
    if (!consumerId) { throw new Error('consumerId is not present'); }

    return this.request.get(`/v1/consumers/${consumerId}`, false);
  }

  /**
   * [This method gets the reviews written by the individual consumer.]
   * {@link https://developers.trustpilot.com/consumer-api#Get a consumer's reviews}
   * @param {[string]} consumerId [required. the id of the consumer]
   * @param {[object]} queryOptions [object containing all the optional filter options]
   * @param {[string]} queryOptions.stars [Filter by reviews with a specific number of stars. Constraints: Allowed values are 1, 2, 3, 4, 5 ]
   * @param {[string]} queryOptions.language [Filter by reviews with only a specific language. Example: language: en]
   * @param {[number]} queryOptions.page [The page to retrieve. If the page number requested is higher than the available
   * number of pages an empty array will be returned. Constraints: The allowed range is minimum: 1, maximum: 2147483647 Example: page: 1]
   * @param {[number]} queryOptions.perPage [The number of reviews to retrieve per page. Constraints: The allowed range is minimum: 1, maximum: 100
   * Default value: 20 Example: perPage: 3]
   * @param {[string]} queryOptions.orderBy [The order in which the results should be sorted. Constraints: Allowed values are createdat.asc, createdat.desc, stars.asc, stars.desc
   * Default value: createdat.desc (multiple values allowed by using comma separation) Example: orderBy: stars.desc]
   * @param {[boolean]} queryOptions.includeReportedReviews [Include reported reviews. Default value: false Example: includeReportedReviews: true]
   * @return {[object]} [object containing the reviews of a specific consumer]
   */
  getConsumerReviews (consumerId, queryOptions) {
    if (!consumerId) { throw new Error('consumerId is not present'); }

    return this.request.get(`/v1/consumers/${consumerId}/reviews`, false, queryOptions);
  }

  /**
   * [This method gets links to consumer's public page on Trustpilot.]
   * {@link https://developers.trustpilot.com/consumer-api#Get a consumer's web links}
   * @param {[string]} consumerId [required. The id of the consumer. ]
   * @param {[string]} locale [required. The locale to use when generating web links. Example: 'da-DK']
   * @return {[object]} [object containing consumer's web links]
   */
  getConsumerWebLinks (consumerId, locale) {
    if (!consumerId) { throw new Error('consumerId is not present'); }

    //set locale just in case they didn't even though its required
    let queryOptions = {
      locale: locale || 'en-US'
    };

    return this.request.get(`/v1/consumers/${consumerId}/web-links`, false, queryOptions);
  }
}

module.exports = Consumer;
