'use strict';
let rp = require('request-promise');

export default class Review {
  constructor (apiKey, host) {
    this.apiKey = apiKey;
    this.host = host;
  }

  latest (lang, callback) {
    if (!lang) {
      lang = 'en';
    }

    let options = {
      qs: {
        language: lang
      },
      headers: {
        apiKey: this.apiKey
      }
    };

    let data = await rp(`${this.host}/v1/reviews/latest`, options);
    return JSON.parse(data);
  }

}
