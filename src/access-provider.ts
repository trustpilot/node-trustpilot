import * as rp from 'request-promise-native';

export class AccessProvider {
  private apiAuthorization: any;
  private apiAccessTokenPromise: Promise<any> | undefined;

  constructor(public trustpilotApiConfig: Readonly<ITrustpilotApiConfig>) {
  }

  private createApiTokenRequest(): any {
    return this.trustpilotApiConfig.apiTokenRequest || {
      uri: '/v1/oauth/oauth-business-users-for-applications/accesstoken',
      form: {
        'grant_type': 'password',
        username: this.trustpilotApiConfig.apiUsername,
        password: this.trustpilotApiConfig.apiPassword
      }
    };
  }

  private async createApiAccessToken(): Promise<any> {
    this.apiAuthorization = await rp.defaults({
      baseUrl: this.trustpilotApiConfig.apiBaseUrl,
      json: true,
      auth: {
        user: this.trustpilotApiConfig.apiKey,
        pass: this.trustpilotApiConfig.apiSecret
      }
    }).post(this.createApiTokenRequest());

    return this.apiAuthorization;
  }

  async getApiAccessToken(): Promise<string> {
    if (this.trustpilotApiConfig.apiAccessToken && this.trustpilotApiConfig.apiAccessToken.trim().length > 0) {
      return this.trustpilotApiConfig.apiAccessToken;
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
