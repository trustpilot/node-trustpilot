interface IHeaders {
  [header: string]: string;
}

interface IKeepAliveOptions {
  keepAlive?: boolean;
  freeSocketTimeout?: number;
  freeSocketKeepAliveTimeout?: number;
  timeout?: number;
  socketActiveTTL?: number;
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
  keepAliveOptions: IKeepAliveOptions;
}

export interface ITrustpilotApiConfig extends Partial<IConfig> {}
