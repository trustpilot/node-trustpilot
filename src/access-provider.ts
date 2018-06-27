import * as rp from 'request-promise-native';
import { ITrustpilotApiConfig } from './models';

export class AccessProvider {
  private apiAuthorization: any | undefined;
  private apiAccessTokenPromise: Promise<any> | undefined;

  constructor(public trustpilotApiConfig: Readonly<ITrustpilotApiConfig>) {}

  public async getApiAccessToken(): Promise<string> {
    if (this.trustpilotApiConfig.accessToken && this.trustpilotApiConfig.accessToken.trim().length > 0) {
      return this.trustpilotApiConfig.accessToken;
    }

    if (this.isTokenValid()) {
      return this.apiAuthorization.access_token;
    } else {
      // Make sure there's only ever one token request in flight
      this.apiAccessTokenPromise = this.apiAccessTokenPromise || this.createApiAccessToken();
      const response = await this.apiAccessTokenPromise;
      return response.access_token;
    }
  }

  private createApiTokenRequest() {
    const defaultRequest = {
      form: {
        grant_type: 'password',
        password: this.trustpilotApiConfig.password,
        username: this.trustpilotApiConfig.username,
      },
      uri: '/v1/oauth/oauth-business-users-for-applications/accesstoken',
    };
    return (this.trustpilotApiConfig.tokenRequest) as typeof defaultRequest || defaultRequest;
  }

  private async createApiAccessToken() {
    const request = this.createApiTokenRequest();
    this.apiAuthorization = await rp.defaults({
      auth: {
        pass: this.trustpilotApiConfig.secret,
        user: this.trustpilotApiConfig.key,
      },
      baseUrl: this.trustpilotApiConfig.baseUrl,
      json: true,
    }).post(request);

    return this.apiAuthorization;
  }

  private isTokenValid(): boolean {
    if (!this.apiAuthorization) {
      return false;
    }

    const shouldExpireBy = parseInt(this.apiAuthorization.issued_at) + parseInt(this.apiAuthorization.expires_in);
    const now = new Date().getTime();

    if (now > (shouldExpireBy - 3600)) {
      delete this.apiAuthorization;
      delete this.apiAccessTokenPromise;
      return false;
    }
    return true;
  }
}
