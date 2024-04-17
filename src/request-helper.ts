import axios from 'axios';
import * as http from 'http';
import * as https from 'https';

import { AccessProvider } from './access-provider';

export class RequestHelper {
  constructor(private accessProvider: AccessProvider, private agent?: http.Agent | https.Agent) {}

  get basicRequest() {
    const headers = this.accessProvider.trustpilotApiConfig.defaultHeaders || {};
    return axios.create({
      httpAgent: this.agent instanceof http.Agent ? this.agent : undefined,
      httpsAgent: this.agent instanceof https.Agent ? this.agent : undefined,
      headers,
      baseURL: this.accessProvider.trustpilotApiConfig.baseUrl,
    });
  }

  get apiRequest() {
    const instance = this.basicRequest;
    if (this.accessProvider.trustpilotApiConfig.key) {
      instance.defaults.headers.apikey = this.accessProvider.trustpilotApiConfig.key;
    }
    return instance;
  }

  public async buildAuthenticatedRequest() {
    const instance = this.basicRequest;
    if (this.accessProvider.trustpilotApiConfig.key) {
      instance.defaults.headers.apikey = this.accessProvider.trustpilotApiConfig.key;
    }
    const authHeader = await this.createBearerTokenHeader();
    instance.defaults.headers.authorization = authHeader;
    return instance;
  }

  private async createBearerTokenHeader() {
    const response = await this.accessProvider.getApiAccessToken();
    return `Bearer ${response}`;
  }
}
