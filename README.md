# trustpilot

[![Build Status](https://travis-ci.org/trustpilot/node-trustpilot.svg?branch=master)](https://travis-ci.org/trustpilot/node-trustpilot) [![npm](https://img.shields.io/npm/v/trustpilot.svg)](https://www.npmjs.com/package/trustpilot)

This a node API wrapper for accessing the Trustpilot APIs. You can learn all about the Trustpilot API at [https://developers.trustpilot.com/](https://developers.trustpilot.com/).

## Installation

This module is built using Typescript and Node.js `v8.10.x`.

If you are not using version 4 of Node, you'll have to transpile the code down to ES5 yourself.

Install using `npm install trustpilot`

## Usage

The trustpilot module is async/await based. It provides [request-promise-native](https://github.com/request/request-promise-native) objects with sane defaults.

### Basic Usage

```js
import { TrustpilotApi } from "./trustpilot-api";

const client = new TrustpilotApi({
    apiKey: 'YOUR-API-KEY',
    apiSecret: 'YOUR-SECRET',
    apiUsername: 'YOUR-TRUSTPILOT-B2B-USERNAME',
    apiPassword: 'YOUR-TRUSTPILOT-B2B-PASSWORD'
  });

// For basic calls authentified by API key, use client.apiRequest
try {
  const response = await client.apiRequest('/v1/resources/images');
} catch(error) {
  // handle the error
});
```

### Usage with OAuth

For calls authentified by OAuth token, use the `authenticate()` promise, which resolves with a `request-promise-native`
object with everything you need.

```js
import { TrustpilotApi } from "./trustpilot-api";

const client = await new TrustpilotApi({
    apiKey: 'YOUR-API-KEY',
    apiSecret: 'YOUR-SECRET',
    apiUsername: 'YOUR-TRUSTPILOT-B2B-USERNAME',
    apiPassword: 'YOUR-TRUSTPILOT-B2B-PASSWORD'
  }).authenticate();

try {
  client(`/v1/private/business-units/${YOUR_BUSINESS_UNIT_ID}/reviews`);
  // same as
  client.get(`/v1/private/business-units/${YOUR_BUSINESS_UNIT_ID}/reviews`);

  client(`/v1/private/business-units/${YOUR_BUSINESS_UNIT_ID}/reviews`);
} catch(error) {
  // handle the error
});
```

### Override API Base URL

The Invitations API methods have a different base URL. To override it, simply pass the `apiBaseUrl`.

```js
import { TrustpilotApi } from "./trustpilot-api";

const client = await new TrustpilotApi({
    apiKey: 'YOUR-API-KEY',
    apiSecret: 'YOUR-SECRET',
    apiUsername: 'YOUR-TRUSTPILOT-B2B-USERNAME',
    apiPassword: 'YOUR-TRUSTPILOT-B2B-PASSWORD',
    apiBaseUrl: 'https://invitations-api.trustpilot.com'
  }).authenticate();

// Use client
```
