# trustpilot

This a NodeJS API wrapper for accessing the Trustpilot APIs. You can learn all about the Trustpilot API at [https://developers.trustpilot.com/](https://developers.trustpilot.com/).

## Installation

This module is built using Typescript and NodeJS `v20.x`.

Install using `npm install trustpilot`

## Usage

As of version 3, the project has been converted to Typescript.
The trustpilot module is async/await based. It provides an [axios instance](https://github.com/axios/axios?tab=readme-ov-file#creating-an-instance) with sane defaults.

### Basic Usage

```ts
import { TrustpilotApi } from "trustpilot";

async run() {
  const client = new TrustpilotApi({
      key: 'YOUR-API-KEY',
      secret: 'YOUR-SECRET',
      username: 'YOUR-TRUSTPILOT-B2B-USERNAME',
      password: 'YOUR-TRUSTPILOT-B2B-PASSWORD',
      baseUrl: 'https://api.trustpilot.com'
    });

  // For basic calls authentified by API key, use client.apiRequest
  try {
    const response = await client.apiRequest('/v1/resources/images');
    console.log(response.data);
  } catch(error) {
    // handle the error
  });
}
```

### Usage with OAuth

For calls authentified by OAuth token, use the `authenticate()` promise, which resolves with an `axiosInstance`
object with everything you need.

```ts
import { TrustpilotApi } from "trustpilot";

async run() {
  const client = await new TrustpilotApi({
      key: 'YOUR-API-KEY',
      secret: 'YOUR-SECRET',
      username: 'YOUR-TRUSTPILOT-B2B-USERNAME',
      password: 'YOUR-TRUSTPILOT-B2B-PASSWORD',
      baseUrl: 'https://api.trustpilot.com'
    }).authenticate();

  try {
    const response = await client.get(`/v1/private/business-units/${YOUR_BUSINESS_UNIT_ID}/reviews`);
    console.log(response.data);
  } catch(error) {
    // handle the error
  });
}
```

### Choose OAuth token grant type

For service-to-service communication use 'client_credentials' grant type and API application key, secret combination to obtain an OAuth token. (Default grant type: password)

```ts
import { TrustpilotApi } from "trustpilot";

async run() {
  const client = await new TrustpilotApi({
      key: 'YOUR-API-KEY',
      secret: 'YOUR-SECRET',
      grantType: 'client_credentials',
      baseUrl: 'https://api.trustpilot.com'
    }).authenticate();

  // Use client
}
```

### Override API Base URL

The Invitations API methods have a different base URL. To override it, simply pass the `baseUrl`.

```ts
import { TrustpilotApi } from "trustpilot";

async run() {
  const client = await new TrustpilotApi({
      key: 'YOUR-API-KEY',
      secret: 'YOUR-SECRET',
      username: 'YOUR-TRUSTPILOT-B2B-USERNAME',
      password: 'YOUR-TRUSTPILOT-B2B-PASSWORD',
      baseUrl: 'https://invitations-api.trustpilot.com'
    }).authenticate();

  // Use client
}
```

### Migration from v3 to v4

As of version 4, [request-promise-native](https://github.com/request/request-promise-native) has been replaced by [axios](https://github.com/axios/axios)

This means all responses are now following [this response schema](https://github.com/axios/axios?tab=readme-ov-file#response-schema)
so code that previously used the response body directly, will need to add a `.data`

```ts
const json = await client.apiRequest('...');
```

```ts
const json = (await client.apiRequest('...')).data;
```
