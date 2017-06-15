'use strict';

const rp = require('request-promise');

class RequestHelper {
  constructor(accessProvider) {
    const basicRequest = rp.defaults({
      baseUrl: accessProvider.host,
      json: true
    });

    const getBearerTokenHeader = () => {
      return accessProvider.getAccessToken()
        .then((responseToken) => {
          return {
            headers: {
              authorization: `Bearer ${responseToken}`,
              apikey: accessProvider.apiKey
            }
          };
        });
    };

    this.buildAuthenticatedRequest = () => {
      return getBearerTokenHeader()
        .then((tokenHeader) => {
          return basicRequest.defaults(tokenHeader);
        });
    };

    this.apiRequest = basicRequest.defaults({
      headers: {
        apikey: accessProvider.apiKey
      }
    });
  }
}

module.exports = RequestHelper;
