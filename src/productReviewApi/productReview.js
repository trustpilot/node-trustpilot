'use strict';

class ProductReview {
  constructor (request) {
    this.request = request;
  }

  /**
   * [Given information about the consumer and the product(s) purchased, get a link that can be sent to the consumer to request reviews.]
   * @param {[string]} businessUnitId [required string of the business Unit Id ]
   * @param {[object]} options [post data to be sent to create an invitation link]
   * @example
   * {
      consumer: {
        email: 'johndoe@somewhere.com',
        name: 'John Doe'
      },
      referenceId: '123ABC',
      locale: 'en-US',
      redirectUri: 'https://www.example.com',
      'roducts: [
        {
          productUrl: 'http://www.mycompanystore.com/products/12345.htm',
          imageUrl: 'http://www.mycompanystore.com/products/images/12345.jpg',
          name: 'Metal Toy Car',
          sku: 'ABC-1234',
          gtin: '01234567890',
          mpn: '7TX1641',
          brand: 'Acme'
        }
      ]
    }
   *@return {[object]} [object containing the reviewLinkId and reviewUrl]
   */
  createInvitationLink (businessUnitId, options) {
    return this.request.post(`/v1/private/product-reviews/business-units/${businessUnitId}/invitation-links`, options);
  }

  /**
   * [Given a list of SKUs or product urls return a list of product reviews. This method includes private information
   * such as consumer e-mail and reference id. By default only published reviews are returned. To get reviews with
   * other states, provide a list in the state field. Pagination is used to retrieve all results.]
   * @param {[string]} businessUnitId [required string of the Business Unit Id]
   * @param {[object]} options [optional. Options object]
   * @param {[number]} options.perPage [optional. of the page to recieve. If the page number requested is higher than
   *  the available number of pages an empty array will be returned. Constraints: The allowed range is minimum: 1, maximum: 2147483647 ]
   *  @param {[string]} option.sku [optional. Filter reviews by product Stock-Keeping Unit (SKU) identifier ]
   *  @param {[string]} options.language [optional. Filter reviews by language. ]
   *  @param {[string]} options.state [optional. Which reviews to retrieve according to their review state. Default is
   *  Published. Constraints: Allowed values are published, unpublished, underModeration, archived
   *  Default value: published (multiple values allowed by using comma separation (not an array!)) ]
   *  @return {[Object]}      [returns a object containing product reviews]
   */
  getPrivate (businessUnitId, options) {
    return this.request.get(`/v1/private/product-reviews/business-units/${businessUnitId}/reviews`, true, options);
  }

  /**
   * [Get a list of summaries of product reviews for a business unit. The summary contains information about stars
   *  average, distribution and count. Pagination is used to retrieve all results.]
   * @param {[string]} businessUnitId [required. string of the Business Unit Id]
   * @param {[object]} options [optional. Options Object]
   * @param {[number]} options.page [optional. The page to retrieve. If the page number requested is higher than the
   * available number of pages an empty array will be returned. Constraints: The allowed range is minimum: 1, maximum: 2147483647 ]
   * @param {[number]} options.perPage [optional. The number of summaries to retrieve per page. Constraints: The allowed range is minimum: 1, maximum: 1000 ]
   * @return {[object]} [object containging a overall product reviews summery report]
   */
  getSummariesList (businessUnitId, options) {
    return this.request.get(`/v1/private/product-reviews/business-units/${businessUnitId}/summaries`, true, options);
  }

  /**
   * [Gets a single private product review. This method includes private information such as consumer e-mail and reference id.]
   * @param {[string]} reviewId [the Id of the specific product review]
   * @return {[object]} [object containing the product review]
   */
  getPrivateSingle (reviewId) {
    return this.request.get(`/v1/private/product-reviews/${reviewId}`, true);
  }
}

module.exports = ProductReview;
