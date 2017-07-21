'use strict';

import * as rp from 'request-promise';

interface OAuthTokenResponse {
  access_token: string;
  issued_at: string;
  expires_in: string;
}

export default class AccessProvider {

  public host: string;
  private tokenHost: string;
  private tokenRequestOptions: rp.Options;
  private tokenPromise: Promise<OAuthTokenResponse>;
  private authorization: OAuthTokenResponse;

  constructor(public apiKey: string,
              private secret: string,
              private username: string,
              private password: string,
              baseUrl: string,
              tokenRequestOptions: rp.Options) {

    this.host = baseUrl;
    this.tokenHost = baseUrl && baseUrl.replace(/https:\/\/invitations-api\./, 'https://api.');
    this.tokenRequestOptions = tokenRequestOptions || {
      uri: '/v1/oauth/oauth-business-users-for-applications/accesstoken',
      form: {
        'grant_type': 'password',
        username: this.username,
        password: this.password
      }
    };
  }

  /**
   * [get the access_token -> if not present, it asks for a new token and returns the access_token]
   * @return {[string]} [Oauth access token]
   */
  async getAccessToken(): Promise<string> {
    if (!this.isTokenValid()) {
      // Make sure there's only ever one token request in flight
      this.tokenPromise = this.tokenPromise || this.generateTokenObject();
      this.authorization = await this.tokenPromise;
    }
    return this.authorization.access_token;
  }

  /**
   * [generates a request for Oauth]
   * @return {[Promise]}  [Oauth authorization object]
   */
  private async generateTokenObject(): Promise<OAuthTokenResponse> {
    return rp.defaults({
      baseUrl: this.tokenHost,
      json: true,
      auth: {
        user: this.apiKey,
        pass: this.secret
      }
    }).post(this.tokenRequestOptions);
  }

  /**
   * [checks if the current access_token is valid]
   * @return {[boolean]} [boolean as to whether current access_token is valid]
   */
  private isTokenValid() {
    if (!this.authorization) {
      return false;
    }

    const shouldExpireBy = parseInt(this.authorization.issued_at) + parseInt(this.authorization.expires_in);
    const now = new Date().getTime();

    if (now > (shouldExpireBy - 3600)) {
      delete this.authorization;
      delete this.tokenPromise;
      return false;
    }

    return true;
  }
}
