'use strict';

class BusinessUnit {
  constructor (request) {
    this.request = request;
  }

  /**
   * [This method gets a list of all the business units with minimum one review.]
   * {@link https://developers.trustpilot.com/business-unit-api#get-a-list-of-business-units}
   * @param {[object]} queryOptions [optional options object]
   * @param {[string]} queryOptions.country [Filter by specific countries using ISO 3166-1-alpha-2. Example: country: 'DK']
   * @param {[number]} queryOptions.page [The page to retrieve. If the page number requested is higher than the available
   * number of pages an empty array will be returned. Constraints: The allowed range is minimum: 1, maximum: 2147483647
   * Example: page: 1]
   * @param {[number]} queryOptions.perPage [The number of business units to retrieve per page.
   * Constraints: The allowed range is minimum: 1, maximum: 1000 Default value: 1000 Example: perPage: 3]
   * @return {[object]} [object containing information about business units]
   */
  listBusinessUnits (queryOptions) {
    return this.request.get(`/v1/business-units`, false, queryOptions);
  }

  /**
   * [This method gets a business unit, if you know the exact name of the business unit.]
   * {@link https://developers.trustpilot.com/business-unit-api#find-a-business-unit}
   * @param {[string]} name [required. The exact identifying or referring name of the business unit. Example: 'trustpilot.com']
   * @return {[object]} [object with information about a specific business unit]
   */
  find (name) {
    let options = {
      name: name
    };

    return this.request.get(`/v1/business-units/find`, false, options);
  }

  /**
   * [This method gets the business unit's basic public information (name, URL, reviews, etc.).]
   * {@link https://developers.trustpilot.com/business-unit-api#get-a-business-unit}
   * @param {[string]} businessUnitId [required. The id of the business unit. ]
   * @return {[object]} [object containing public information about a business unit]
   */
  get (businessUnitId) {
    if (!businessUnitId) { throw new Error('businessUnitId is not present'); }

    return this.request.get(`/v1/business-units/${businessUnitId}`, false);
  }

  /**
   * [This method gets links to the business unit's public profile page on Trustpilot.]
   * {@link https://developers.trustpilot.com/business-unit-api#get-a-business-unit's-web-links}
   * @param {[string]} businessUnitId [required. The id of the business unit. ]
   * @param {[string]} locale [required. The locale to use when generating web links. Example: 'en-US']
   * @return {[object]} [object containing the web links for a specific buisiness unit]
   */
  getWebLinks (businessUnitId, locale) {
    if (!businessUnitId) { throw new Error('businessUnitId is not present'); }

    let options = {
      locale: locale || 'en-US'
    };

    return this.request.get(`/v1/business-units/${businessUnitId}/web-links`, false, options);
  }

  /**
   * [This method gets all the reviews written about the business unit.]
   * {@link https://developers.trustpilot.com/business-unit-api#get-a-business-unit's-reviews}
   * @param {[string]} businessUnitId [required. The id of the business unit. ]
   * @param {[object]} queryOptions [optional options object]
   * @param {[string]} queryOptions.stars [Filter by reviews with a specific number of stars.
   * Constraints: Allowed values are 1, 2, 3, 4, 5 Example: stars: 5]
   * @param {[string]} queryOptions.language [Filter by reviews with only a specific language. Example: ?language: 'en']
   * @param {[number]} queryOptions.page [The page to retrieve. If the page number requested is higher than the available
   *  number of pages an empty array will be returned. Constraints: The allowed range is minimum: 1, maximum: 2147483647
   *  Example: page: 1]
   * @param {[number]} queryOptions.perPage [The number of reviews to retrieve per page.
   * Constraints: The allowed range is minimum: 1, maximum: 100 Default value: 20 Example: perPage: 3]
   * @param {[string]} queryOptions.orderBy [The order in which the results should be sorted.
   * Constraints: Allowed values are createdat.asc, createdat.desc, stars.asc, stars.desc Default value: createdat.desc (multiple values allowed by using comma separation)
   * Example: orderBy: stars.desc]
   * @param {[string]} queryOptions.tagGroup [Filtering reviews on Tag group Example: tagGroup: Group name]
   * @param {[string]} queryOptions.tagValue [Filtering reviews on Tag value Example: tagValue: Tag name]
   * @param {[boolean]} queryOptions.responded [Filter reviews by responded state. Example: responded: true]
   * @param {[boolean]} queryOptions.includeReportedReviews [Include reported reviews. Default value: false
   * Example: includeReportedReviews: true]
   * @return {[object]} [object containing reviews]
   */
  getReviews (businessUnitId, queryOptions) {
    if (!businessUnitId) { throw new Error('businessUnitId is not present'); }

    return this.request.get(`/v1/business-units/${businessUnitId}/reviews`, false, queryOptions);
  }

  /**
   * [This method shows all the reviews written about the business unit, including consumer email and Order ID.]
   * {@link https://developers.trustpilot.com/business-unit-api#business-unit-private-reviews}
   * @param {[string]} businessUnitId [required. The id of the business unit. ]
   * @param {[object]} queryOptions [optional options object]
   * @param {[string]} queryOptions.stars [Filter by reviews with a specific number of stars.
   * Constraints: Allowed values are 1, 2, 3, 4, 5 Example: stars: 5]
   * @param {[string]} queryOptions.language [Filter by reviews with only a specific language. Example: ?language: 'en']
   * @param {[number]} queryOptions.page [The page to retrieve. If the page number requested is higher than the available
   *  number of pages an empty array will be returned. Constraints: The allowed range is minimum: 1, maximum: 2147483647
   *  Example: page: 1]
   * @param {[number]} queryOptions.perPage [The number of reviews to retrieve per page.
   * Constraints: The allowed range is minimum: 1, maximum: 100 Default value: 20 Example: perPage: 3]
   * @param {[string]} queryOptions.orderBy [The order in which the results should be sorted.
   * Constraints: Allowed values are createdat.asc, createdat.desc, stars.asc, stars.desc Default value: createdat.desc (multiple values allowed by using comma separation)
   * Example: orderBy: stars.desc]
   * @param {[string]} queryOptions.tagGroup [Filtering reviews on Tag group Example: tagGroup: Group name]
   * @param {[string]} queryOptions.tagValue [Filtering reviews on Tag value Example: tagValue: Tag name]
   * @param {[boolean]} queryOptions.responded [Filter reviews by responded state. Example: responded: true]
   * @param {[string]} queryOptions.referenceId [Filter reviews by reference Id. Example: referenceId: '12A34']
   * @param {[string]} queryOptions.referralEmail [Filter reviews by referral email. Example: referralEmail: 'me@example.com']
   * @param {[boolean]} queryOptions.reported [Filter reviews by reported state. Example: reported: true]
   * @param {[string]} queryOptions.startDateTime [Filter reviews by datetime range. If no time is specified than time is implicit 00:00:00
   * Example: startDateTime: 9/7/2013 1:37:00 PM]
   * @param {[string]} queryOptions.endDateTime [Filter reviews by datetime range. If no time is specified than time is implicit 00:00:00
   * Example: endDateTime: 9/7/2013 1:37:00 PM]
   * @param {[string]} queryOptions.source [Filter reviews by source. Constraints: Allowed values are afs, trustpilot, kickstart, uniqueLink
   * Example: source: 'Trustpilot']
   * @param {[string]} queryOptions.username [Filter reviews by user name. Example: username: 'Luke Skywalker']
   * @return {[object]} [object containing reviews]
   */
  getPrivateReviews (businessUnitId, queryOptions) {
    if (!businessUnitId) { throw new Error('businessUnitId is not present'); }

    return this.request.get(`/v1/private/business-units/${businessUnitId}/reviews`, true, queryOptions);
  }

  /**
   * [This method gets all the tags used by a business unit. Tags in group 'generic' have been registered without a group.]
   * {@link https://developers.trustpilot.com/business-unit-api#get-all-business-unit-private-tags}
   * @param {[string]} businessUnitId [required. The id of the business unit. ]
   * @return {[object]} [object containing tags]
   */
  getPrivateTags (businessUnitId) {
    if (!businessUnitId) { throw new Error('businessUnitId is not present'); }

    return this.request.get(`/v1/private/business-units/${businessUnitId}/tags`, true);
  }

  /**
   * [Get a list of categories for a business unit.]
   * {@link https://developers.trustpilot.com/business-unit-api#list-categories-for-business-unit}
   * @param {[string]} businessUnitId [required. The id of the business unit. ]
   * @return {[object]} [object list of categories]
   */
  listCategories (businessUnitId) {
    if (!businessUnitId) { throw new Error('businessUnitId is not present'); }

    return this.request.get(`/v1/business-units/${businessUnitId}/categories`, false);
  }
}

module.exports = BusinessUnit;
