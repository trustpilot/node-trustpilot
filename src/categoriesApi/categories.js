'use strict';

class Categories {
  constructor (request) {
    this.request = request;
  }

  /**
   * [Get a list of categories under a specific parent category.]
   * {@link https://developers.trustpilot.com/categories-api#List categories}
   * @param {[string]} country [required. Specify country using ISO 3166-1-alpha-2. Example: 'DK']
   * @param {[object]} queryOptions [object of additional options]
   * @param {[string]} queryOptions.parentId [Optional id of a parent category to list children of. Example: '507f191e810c19729de860ea']
   * @param {[string]} queryOptions.locale [The locale to get translated category names for. Default value: 'en-US'
   * Example: locale: 'da-DK']
   * @return {[object]} [object containing category information]
   */
  listCategories (country, queryOptions) {
    let options = queryOptions || {};

    //default it to the US just in case they didn't set it.
    options.country = country || 'US';

    return this.request.get(`/v1/categories`, false, options);
  }

  /**
   * [Get details of a specific category.]
   * {@link https://developers.trustpilot.com/categories-api#Get category}
   * @param {[string]} categoryId [required. The id of the category to get details about. ]
   * @param {[country]} country [required. Specify country using ISO 3166-1-alpha-2. Example: 'US']
   * @param {[object]} queryOptions [optional options object]
   * @param {[string]} queryOptions.locale [optional. The locale to get translated category names for. Default value:
   * 'en-US' Example: locale: 'da-DK']
   * @return {[object]} [object with information about the specific category]
   */
  get (categoryId, country, queryOptions) {
    let options = queryOptions || {};

    options.country = country || 'US';

    return this.request.get(`/v1/categories/${categoryId}`, false, options);
  }

  /**
   * [Get details of a specific category by its name.]
   * {@link https://developers.trustpilot.com/categories-api#Find category}
   * @param {[string]} name [required. The system name of the category to get details about. Example: 'art-supplies']
   * @param {[string]} country [required. Specify country using ISO 3166-1-alpha-2. Example: 'DK']
   * @param {[object]} queryOptions [optional options object]
   * @param {[string]} queryOptions.locale [optional. The locale to get translated category names for. Default value: 'en-US'
   *  Example: locale: 'da-DK']
   *  @return {[object]} [object containing information about a given category]
   */
  find (name, country, queryOptions) {
    let options = queryOptions || {};

    options.name = name;
    options.country = country || 'US';

    return this.request.get(`/v1/categories/find`, false, options);
  }

  /**
   * [Get a ranked list of business units in a specific category.]
   * {@link https://developers.trustpilot.com/categories-api#List business units in category}
   * @param {[string]} categoryId [required. The id of the category to get business unit list for.]
   * @param {[string]} country [required. Specify country using ISO 3166-1-alpha-2. Example: 'DK']
   * @param {[object]} queryOptions [optional qeury options object]
   * @param {[numger]} queryOptions.page [optional. The page to retrieve. If the page number requested is higher than
   * the available number of pages an empty array will be returned. Constraints: The allowed range is minimum: 1,
   * maximum: 2147483647 Default value: 1 Example: page: 1]
   * @param {[number]} queryOptions.perPage [optional. The number of business units to retrieve per page.
   * Constraints: The allowed range is minimum: 1, maximum: 100 Default value: 20 Example: perPage: 3]
   * @return {[object]} [object of all the businesUnits with specific category]
   */
  listBusinessUnits (categoryId, country, queryOptions) {
    let options = queryOptions || {};

    options.country = country || 'US';

    return this.request.get(`/v1/categories/${categoryId}/business-units`, false, options);
  }

  /**
   * [Get details of a specific category by its name.]
   * {@link https://developers.trustpilot.com/categories-api#Search category}
   * @param {[string]} searchQuery [required. The system name of the category to get details about. Example: 'art-supplies']
   * @param {[string]} country [required. Specify country using ISO 3166-1-alpha-2. Example: 'DK']
   * @param {[object]} queryOptions [optional options object]
   * @param {[string]} queryOptions.locale [The locale to get translated category names for. Default value: 'en-US'
   * Example: locale: 'da-DK']
   *@return {[object]} [object containing details about a specific category]
   */
  search (searchQuery, country, queryOptions) {
    let options = queryOptions || {};

    options.query = searchQuery;
    options.country = country || 'US';

    return this.request.get(`/v1/categories/search`, false, options);
  }
}

module.exports = Categories;
