import { AccessProvider } from './access-provider';
import { ITrustpilotApiConfig } from './models';
import { RequestHelper } from './request-helper';
import * as https from 'https';

export class TrustpilotApi {
  private requestHelper: RequestHelper;

  constructor(config: Readonly<ITrustpilotApiConfig>, agent?: https.Agent) {
    const accessProvider = new AccessProvider(Object.freeze(config));
    this.requestHelper = new RequestHelper(accessProvider, agent);
  }

  get apiRequest() {
    return this.requestHelper.apiRequest;
  }

  public authenticate() {
    return this.requestHelper.buildAuthenticatedRequest();
  }
}
