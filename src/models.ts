interface IConfig {
  baseUrl: string;
  key: string;
  secret: string;
  username: string;
  password: string;
  tokenRequest: any;
  accessToken: string;
}

export interface ITrustpilotApiConfig extends Partial<IConfig> {}
