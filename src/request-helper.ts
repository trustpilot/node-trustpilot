import * as rp from 'request-promise-native';

import { AccessProvider } from './access-provider';

export class RequestHelper {
  constructor(private accessProvider: AccessProvider) {}

  get basicRequest() {
    return rp.defaults({
      baseUrl: this.accessProvider.trustpilotApiConfig.baseUrl,
      json: true,
    });
  }

  get apiRequest() {
    return this.basicRequest.defaults({
      headers: {
        apikey: this.accessProvider.trustpilotApiConfig.key,
      },
    });
  }

  public async buildAuthenticatedRequest() {
    return this.basicRequest.defaults(await this.createBearerTokenHeader());
  }

  private async createBearerTokenHeader() {
    const response = await this.accessProvider.getApiAccessToken();

    return {
      headers: {
        apikey: this.accessProvider.trustpilotApiConfig.key,
        authorization: `Bearer ${response}`,
      },
    };
  }
}
