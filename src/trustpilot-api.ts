import { RequestAPI, UriOptions, UrlOptions } from 'request';
import { RequestPromise, RequestPromiseOptions } from 'request-promise-native';
import { AccessProvider } from './access-provider';
import { ITrustpilotApiConfig } from './models';
import { RequestHelper } from './request-helper';

export class TrustpilotApi {
  private requestHelper: RequestHelper;

  constructor(config: Readonly<ITrustpilotApiConfig>) {
    const accessProvider = new AccessProvider(Object.freeze(config));
    this.requestHelper = new RequestHelper(accessProvider);
  }

  get apiRequest() {
    return this.requestHelper.apiRequest;
  }

  public authenticate() {
    return this.requestHelper.buildAuthenticatedRequest();
  }
}
