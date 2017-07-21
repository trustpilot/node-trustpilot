'use strict';

import * as r from 'request';
import * as rp from 'request-promise';
import AccessProvider from './accessProvider';

export default class RequestHelper {

  public apiRequest: any;
  public buildAuthenticatedRequest: any;

  constructor(accessProvider: AccessProvider) {
    const basicRequest = rp.defaults({
      baseUrl: accessProvider.host,
      json: true
    });

    const getBearerTokenHeader = async () => {
      const token = await accessProvider.getAccessToken();
      return {
        headers: {
          authorization: `Bearer ${token}`,
          apikey: accessProvider.apiKey
        }
      };
    };

    this.buildAuthenticatedRequest = async () => {
      const tokenHeader = await getBearerTokenHeader();
      return basicRequest.defaults(tokenHeader);
    };

    this.apiRequest = basicRequest.defaults({
      headers: {
        apikey: accessProvider.apiKey
      }
    });
  }
}
