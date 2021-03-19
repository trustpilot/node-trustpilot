import * as rp from 'request-promise-native';
import * as http from 'http';
import * as https from 'https';

import { AccessProvider } from './access-provider';

export class RequestHelper {
  constructor(private accessProvider: AccessProvider, private agent?: http.Agent | https.Agent) {}

  get basicRequest() {
    const headers = this.accessProvider.trustpilotApiConfig.defaultHeaders || {};

    return rp.defaults({
      baseUrl: this.accessProvider.trustpilotApiConfig.baseUrl,
      headers,
      json: true,
      agent: this.agent,
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
