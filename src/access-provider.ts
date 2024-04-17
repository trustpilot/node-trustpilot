import axios, { AxiosResponse } from 'axios';

import { GrantType, ITrustpilotApiConfig } from './models';

type AccessTokenResponse = { access_token: string; issued_at: string; expires_in: string };

export class AccessProvider {
  private apiAuthorization: AccessTokenResponse | undefined;
  private apiAccessTokenPromise: Promise<AxiosResponse<AccessTokenResponse, any>> | undefined;

  constructor(public trustpilotApiConfig: Readonly<ITrustpilotApiConfig>) {}

  public async getApiAccessToken(): Promise<string> {
    if (this.trustpilotApiConfig.accessToken && this.trustpilotApiConfig.accessToken.trim().length > 0) {
      return this.trustpilotApiConfig.accessToken;
    }

    if (this.isTokenValid()) {
      return this.apiAuthorization!.access_token;
    } else {
      // Make sure there's only ever one token request in flight
      this.apiAccessTokenPromise = this.apiAccessTokenPromise || this.createApiAccessToken();
      const response = await this.apiAccessTokenPromise;
      this.apiAuthorization = response.data;
      return response.data.access_token;
    }
  }

  private createApiTokenRequest() {
    const defaultRequest = {
      form: new URLSearchParams({
        grant_type: this.trustpilotApiConfig.grantType || GrantType.password,
      }),
      uri: '/v1/oauth/oauth-business-users-for-applications/accesstoken',
    };
    if (this.trustpilotApiConfig.password) {
      defaultRequest.form.append('password', this.trustpilotApiConfig.password);
    }
    if (this.trustpilotApiConfig.username) {
      defaultRequest.form.append('username', this.trustpilotApiConfig.username);
    }
    return this.trustpilotApiConfig.tokenRequest || defaultRequest;
  }

  private async createApiAccessToken() {
    const request = this.createApiTokenRequest();
    const hasAuth = !!this.trustpilotApiConfig.key && !!this.trustpilotApiConfig.secret;
    const response = await axios.post<AccessTokenResponse>(request.uri, request.form, {
      ...(hasAuth
        ? {
            auth: {
              username: this.trustpilotApiConfig.key!,
              password: this.trustpilotApiConfig.secret!,
            },
          }
        : {}),
      baseURL: this.getAccessTokenHost(),
    });
    return response;
  }

  private getAccessTokenHost() {
    const baseUrl = this.trustpilotApiConfig.baseUrl;
    return baseUrl && baseUrl.replace(/https:\/\/invitations-api\./, 'https://api.');
  }

  private isTokenValid(): boolean {
    if (!this.apiAuthorization) {
      return false;
    }

    const shouldExpireBy = parseInt(this.apiAuthorization.issued_at) + parseInt(this.apiAuthorization.expires_in);
    const now = new Date().getTime();

    if (now > shouldExpireBy - 3600) {
      delete this.apiAuthorization;
      delete this.apiAccessTokenPromise;
      return false;
    }
    return true;
  }
}
