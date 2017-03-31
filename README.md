# trustpilot

[![Build Status](https://travis-ci.org/trustpilot/node-trustpilot.svg?branch=master)](https://travis-ci.org/trustpilot/node-trustpilot) [![npm](https://img.shields.io/npm/v/trustpilot.svg)](https://www.npmjs.com/package/trustpilot)

This a node API wrapper for accessing the Trustpilot APIs. You can learn all about the Trustpilot API at [https://developers.trustpilot.com/](https://developers.trustpilot.com/).

## Installation

This module is built using Node.js `v4.0.x`.

If you are not using version 4 of Node, you'll have to transpile the code down to ES5 yourself.

Install using `npm install trustpilot`

## Usage

The trustpilot module is Promise based. Essentially, it provides [request-promise](https://github.com/request/request-promise) objects with sensible defaults.

### Basic Usage

```js
let Trustpilot = require('trustpilot');

let client = new Trustpilot(
  {
    apiKey: YOUR-API-KEY-HERE,
    secret: YOUR-SECRET-HERE,
    username: YOUR-TRUSTPILOT-B2B-LOGIN-EMAIL,
    password: YOUR-TRUSTPILOT-B2B-LOGIN-PASSWORD
  });

// For basic calls authentified by API key, use client.apiRequest
client.apiRequest('/v1/resources/images')
  .then((response) => {
    //handle the response
  })
  .catch((error) => {
      //handle the error
  });
```

### Usage with OAuth

For calls authentified by OAuth token, use the `authenticate()` promise, which resolves with a `request-promise`
object with everything you need.

```js
client.authenticate((rp) => {
  return rp(`/v1/private/business-units/${YOUR_BUSINESS_UNIT_ID}/reviews`)
})
  .then((response) => {
    //handle the response
  })
  .catch((error) => {
      //handle the error
  });
```

### Invitations API

The Invitations API methods have a different base URL. Here are two ways you can access them.

1. Knowing that `authenticate()` promises you a `request-promise` object, you can use `.defaults()` to override the base URL.

```js
client.authenticate((rp) => {
  return rp.defaults({
    baseUrl: 'https://invitations-api.trustpilot.com'
  })(AN-INVITATIONS-API-ENDPOINT)
})
```

2. If you only need to access the Invitations API, just initialize your client with the Invitations API base URL.
```js
let Trustpilot = require('trustpilot');

let client = new Trustpilot(
  {
    apiKey: YOUR-API-KEY-HERE,
    secret: YOUR-SECRET-HERE,
    username: YOUR-TRUSTPILOT-B2B-LOGIN-EMAIL,
    password: YOUR-TRUSTPILOT-B2B-LOGIN-PASSWORD,
    baseUrl: 'https://invitations-api.trustpilot.com'
  });
```
