interface IHeaders {
  [header: string]: string;
}

interface IConfig {
  baseUrl: string;
  key: string;
  secret: string;
  username: string;
  password: string;
  tokenRequest: any;
  accessToken: string;
  defaultHeaders: IHeaders;
}

export interface ITrustpilotApiConfig extends Partial<IConfig> {}
