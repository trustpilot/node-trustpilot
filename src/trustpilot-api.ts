import { AccessProvider } from './access-provider';
import { ITrustpilotApiConfig } from './models';
import { RequestHelper } from './request-helper';

export class TrustpilotApi {
  private requestHelper: RequestHelper;

  constructor(clientConfig: Readonly<ITrustpilotApiConfig>) {
    const accessProvider = new AccessProvider(Object.freeze(clientConfig));
    this.requestHelper = new RequestHelper(accessProvider);
  }

  get apiRequest() {
    return this.requestHelper.apiRequest;
  }

  public authenticate() {
    return this.requestHelper.buildAuthenticatedRequest();
  }
}
