interface IHeaders {
  [header: string]: string;
}

interface IConfig {
  baseUrl: string;
  key: string;
  secret: string;
  username: string;
  password: string;
  tokenRequest: {
    form: URLSearchParams;
    uri: string;
  };
  accessToken: string;
  grantType: GrantType;
  defaultHeaders: IHeaders;
}

export enum GrantType {
  password = 'password',
  client_credentials = 'client_credentials',
}

export interface ITrustpilotApiConfig extends Partial<IConfig> {}
