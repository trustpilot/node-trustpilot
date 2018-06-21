import { AccessProvider } from './access-provider';
import { RequestHelper } from './request-helper';

export class TrustpilotApi {
  private requestHelper: RequestHelper;

  constructor(clientConfig: Readonly<ITrustpilotApiConfig>) {
    const accessProvider = new AccessProvider(clientConfig);
    this.requestHelper = new RequestHelper(accessProvider);
  }

  get apiRequest(): Promise<any> {
    return this.requestHelper.apiRequest;
  }

  authenticate(): Promise<any> {
    return this.requestHelper.buildAuthenticatedRequest();
  }
}
