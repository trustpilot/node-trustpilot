# trustpilot

[![Build Status](https://travis-ci.org/trustpilot/node-trustpilot.svg?branch=master)](https://travis-ci.org/trustpilot/node-trustpilot) [![npm](https://img.shields.io/npm/v/trustpilot.svg)](https://www.npmjs.com/package/trustpilot)

This a node API wrapper for accessing the Trustpilot APIs. You can learn all about the Trustpilot API at [https://developers.trustpilot.com/](https://developers.trustpilot.com/).

## Installation

This module is built using Typescript and Node.js `v8.10.x`.

If you are not using version 4 of Node, you'll have to transpile the code down to ES5 yourself.

Install using `npm install trustpilot`

## Usage

As of version 3, the project has been converted to Typescript.
The trustpilot module is async/await based. It provides [request-promise-native](https://github.com/request/request-promise-native) objects with sane defaults.

### Basic Usage

```ts
import { TrustpilotApi } from "trustpilot";

async run() {
  const client = new TrustpilotApi({
      key: 'YOUR-API-KEY',
      secret: 'YOUR-SECRET',
      username: 'YOUR-TRUSTPILOT-B2B-USERNAME',
      password: 'YOUR-TRUSTPILOT-B2B-PASSWORD'
    });

  // For basic calls authentified by API key, use client.apiRequest
  try {
    const response = await client.apiRequest('/v1/resources/images');
  } catch(error) {
    // handle the error
  });
}
```

### Usage with OAuth

For calls authentified by OAuth token, use the `authenticate()` promise, which resolves with a `request-promise-native`
object with everything you need.

```ts
import { TrustpilotApi } from "trustpilot";

async run() {
  const client = await new TrustpilotApi({
      key: 'YOUR-API-KEY',
      secret: 'YOUR-SECRET',
      username: 'YOUR-TRUSTPILOT-B2B-USERNAME',
      password: 'YOUR-TRUSTPILOT-B2B-PASSWORD'
    }).authenticate();

  try {
    await client(`/v1/private/business-units/${YOUR_BUSINESS_UNIT_ID}/reviews`);
    // same as
    await client.get(`/v1/private/business-units/${YOUR_BUSINESS_UNIT_ID}/reviews`);
  } catch(error) {
    // handle the error
  });
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
