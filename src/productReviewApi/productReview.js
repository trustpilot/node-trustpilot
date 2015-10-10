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

  /**
   * [Prepares the review for participating in a conversation by issuing a conversation ID]
   * @param {[string]} reviewId [Required. The id of the product review]
   * @return {[object]} [object containing the conversationId]
   */
  createConversation (reviewId) {
    return this.request.get(`/v1/private/product-reviews/${reviewId}/create-conversation`, true);
  }

  /**
   * [Get a summary of product reviews for a single or multiple SKU(s) or productUrl(s). Note: Even though productUrl
   *  and sku are listed as optional parameters at least one of them must be specified. If both sku and productUrl are
   *  specified the productUrl is ignored and a search will be made only on the basis of the sku. The summary contains
   *  information about stars average, distribution and count.]
   *  @param {[businessUnitId]} string [Required. The id of the business unit. ]
   *  @param {[object]} options [optional options object]
   *  @param {[string]} options.productUrl [The url of the product. Mandatory only if no sku is provided, else ignored. ]
   *  @param {[string]} options.sku [A single or multiple comma-separated SKUs of the product(s). Optional only if productUrl is provided. ]
   *  @return {[object]} [object containing product reviews summary]
   */
  getSummary (businessUnitId, options) {
    return this.request.get(`/v1/product-reviews/business-units/${businessUnitId}`, false, options);
  }

  /**
   * [This method allows you to get business unit product reviews for SKUs and / or productUrls. Note: Even though
   *  productUrl and sku are listed as optional parameters at least one of them must be specified. It includes review
   *  content, date of creation of review, individual star rating, id and display name of the consumer who wrote the review.
   *  Pagination and filtering reviews by language is also possible.]
   * @param  {[string]} businessUnitId [ Required string.]
   * @param {[object]} options [optional options object]
   * @param {[number]} options.page [The page to retrieve. If the page number requested is higher than the available
   * number of pages an empty array will be returned. Constraints: The allowed range is minimum: 1, maximum: 2147483647 ]
   * @param {[number]} options.perPage [The number of reviews to retrieve per page. Constraints: The allowed range is minimum: 1, maximum: 100 Default value: 20 ]
   * @param {[string]} options.productUrl [The url of the product. Optional only if sku is provided.]
   * @param {[string]} options.sku [The sku of the product. Optional only if productUrl is provided.]
   * @param {[string]} options.language [Filter reviews by language]
   * @return {[object]}                [object containing product reviews]
   */
  getProductReviews (businessUnitId, options) {
    return this.request.get(`/v1/product-reviews/business-units/${businessUnitId}/reviews`, false, options);
  }

}

module.exports = ProductReview;
