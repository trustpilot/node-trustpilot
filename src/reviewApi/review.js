'use strict';

let request = require('request');

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

    return request(`${this.host}/v1/reviews/latest`, options, function (err, resp, body) {
      if (err) {
        return callback(err);
      }

      callback(JSON.parse(body));
    });

  }
}
