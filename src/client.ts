'use strict';

import * as rp from 'request-promise';
import AccessProvider from './accessProvider';
import RequestHelper from './requestHelper';

class Trustpilot {
  public apiRequest: any;
  public authenticate: () => Promise<any>;

  private apiKey: string;
  private baseUrl: string;
  private secret: string;
  private username: string;
  private password: string;
  private tokenRequest: rp.Options;

  constructor({
    apiKey,
    baseUrl = 'https://api.trustpilot.com',
    secret = '',
    username,
    password,
    tokenRequest
  }: any) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.secret = secret;
    this.username = username;
    this.password = password;
    this.tokenRequest = tokenRequest;

    const accessProvider = new AccessProvider(this.apiKey, this.secret, this.username, this.password,
      this.baseUrl, this.tokenRequest);
    const requestHelper = new RequestHelper(accessProvider);

    this.apiRequest = requestHelper.apiRequest;
    this.authenticate = (): Promise<any> => {
      return requestHelper.buildAuthenticatedRequest();
    };
  }
}

export = Trustpilot;
