import * as rp from 'request-promise-native';
import { AccessProvider } from './access-provider';

export class RequestHelper {
  public apiRequest: any;
  private basicRequest: any;

  constructor(private accessProvider: AccessProvider) {
    this.basicRequest = rp.defaults({
      baseUrl: this.accessProvider.trustpilotApiConfig.apiBaseUrl,
      json: true,
    });
    this.apiRequest = this.basicRequest.defaults({
      headers: {
        apikey: accessProvider.trustpilotApiConfig.apiKey,
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
        apikey: this.accessProvider.trustpilotApiConfig.apiKey,
        authorization: `Bearer ${response}`,
      },
    };
  }
}
