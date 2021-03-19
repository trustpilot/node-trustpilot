import * as rp from 'request-promise-native';
import * as Agent from 'agentkeepalive';

import { AccessProvider } from './access-provider';

export class RequestHelper {
  private httpsAgent: Agent.HttpsAgent;

  constructor(private accessProvider: AccessProvider) {
    const keepAliveOptions = this.accessProvider.trustpilotApiConfig.keepAliveOptions as Agent.HttpsOptions;
    this.httpsAgent =  keepAliveOptions ? new Agent.HttpsAgent(keepAliveOptions): new Agent.HttpsAgent({ keepAlive: true })
  }

  get basicRequest() {
    const headers = this.accessProvider.trustpilotApiConfig.defaultHeaders || {};

    return rp.defaults({
      baseUrl: this.accessProvider.trustpilotApiConfig.baseUrl,
      headers,
      json: true,
      agent: this.httpsAgent,
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
