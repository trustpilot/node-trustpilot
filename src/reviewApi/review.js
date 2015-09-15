'use strict';
let rp = require('request-promise');

class Review {
  constructor (apiKey, host) {
    this.apiKey = apiKey;
    this.host = host;
  }

  latest (lang) {
    return new Promise((resolve, reject) => {

      let options = {
        qs: {
          language: lang || 'en'
        },
        headers: {
          apiKey: this.apiKey
        }
      };

      rp(`${this.host}v1/reviews/latest`, options).then(function (data) {
        resolve(JSON.parse(data));
      });

    });

  }

  single (reviewId) {
    return new Promise((resolve, reject) => {
      let options = {
        headers: {
          apiKey: this.apiKey
        }
      };

      rp(`${this.host}v1/reviews/${reviewId}`, options).then(function (data) {
        resolve(JSON.parse(data));
      });
    });
  }
}

module.exports = Review;
