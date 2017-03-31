'use strict';

class Resources {
  constructor(request) {
    this.request = request;
  }

  /**
   * [This resource gives navigational links to all the image resources that are available.]
   * {@link https://developers.trustpilot.com/resources-api#contains-navigational-links-to-all-image-resources}
   * @return {[object]} [object containing all the navigational inks]
   */
  getImageNavigationalLinks() {
    return this.request.get('/v1/resources/images', false);
  }

  /**
   * [This resource shows you the different sizes that are available, as well as the URLs for the images. Use this resource to get the Trustpilot stars]
   * {@link https://developers.trustpilot.com/resources-api#get-the-star-image-resources}
   * @param {[number]} [optional number - gets the star images for that star - allowed values are 0, 1, 2, 3, 4, 5 ]
   * @return {[object]} [object containing links to the individual stars or a certain star's image links ]
   */
  getStarImages(stars) {
    const endpoint = stars ? `/v1/resources/images/stars/${stars}` : '/v1/resources/images/stars';
    return this.request.get(endpoint, false);
  }

  /**
   * [This resource shows you the different sizes that are available, as well as the URLs for the images. Use this resource to get the Trustpilot logo.]
   * {@link https://developers.trustpilot.com/resources-api#get-the-trustpilot-logo-images}
   * @return {[object]} [links to all the different Trustpilot logos]
   */
  getLogoImages() {
    return this.request.get('/v1/resources/images/logos', false);
  }

  /**
   * [This resource shows you the different sizes that are available, as well as the URLs for the images. Use this resource to get the Trustpilot icon (checkbox).]
   * {@link https://developers.trustpilot.com/resources-api#get-the-trustpilot-icon-images}
   * @return {[object]} [links to all the different Trustpilot icon images]
   */
  getTrustpilotIconImages() {
    return this.request.get('/v1/resources/images/icons', false);
  }

  /**
   * [This resource will output all supported locales of the Trustpilot system, including URLs to the different Trustpilot sites.]
   * {@link https://developers.trustpilot.com/resources-api#get-trustpilot-supported-locales}
   * @return {[object]} [object of all supported locales and their links]
   */
  getSupportedLocales() {
    return this.request.get('/v1/resources/metadata/locales', false);
  }

  /**
   * [This resource will output all countries known to Trustpilot, including the name of the country (in English).]
   * {@link https://developers.trustpilot.com/resources-api#get-all-countries-known-to-trustpilot}
   * @return {[object]} [object containing array of all the countries known to Trustpilot]
   */
  getKnownCountries() {
    return this.request.get('/v1/resources/metadata/countries', false);
  }

  /**
   * [This resource gives the text representation of the stars used to represent the TrustScore as Text. For example: 'Excellent'
   * defaults to English if no locale is provided]
   * {@link https://developers.trustpilot.com/resources-api#get-the-string-representation-of-the-stars}
   * @param {[object]} [optional object containing locale and/or star value]
   * @param {[string]} options.locale [locale for translation e.g. 'da-DK']
   * @param {[number]} options.stars [star value to return e.g. 4]
   * @return {[object]} [object containing links to string representation of stars or a certain star's string representation ]
   */
  getStringRepresentationOfStars(options) {
    options = options || {};

    options.locale = options.locale || 'en-US';

    const endpoint = options.stars ? `/v1/resources/strings/stars/${options.stars}` : '/v1/resources/strings/stars';

    return this.request.get(endpoint, false, options);
  }
}

module.exports = Resources;
