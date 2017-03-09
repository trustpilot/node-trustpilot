# trustpilot

[![Build Status](https://travis-ci.org/trustpilot/node-trustpilot.svg?branch=master)](https://travis-ci.org/trustpilot/node-trustpilot) [![npm](https://img.shields.io/npm/v/trustpilot.svg)](https://www.npmjs.com/package/trustpilot)

This a node API wrapper for accessing the Trustpilot APIs. You can learn all about the Trustpilot API at [https://developers.trustpilot.com/](https://developers.trustpilot.com/).


# Installation
This module is built using Node.js `v4.0.x`.

If you are not using version 4 of Node, you'll have to transpile the code down to ES5 yourself.

Install using `npm install trustpilot`

# Usage
The trustpilot mondule is Promise based.

#### Basic Usage
```
let Trustpilot = require('trustpilot');

let client = new Trustpilot(
  {
    apiKey: YOUR-API-KEY-HERE,
    secret: YOUR-SECRET-HERE,
    username: YOUR-TRUSTPILOT-B2B-LOGIN-EMAIL,
    password: YOUR-TRUSTPILOT-B2B-LOGIN-PASSWORD
  });

client.getLogoImages()
  .then(response => {
    //handle the response
  })
  .catch(error => {
      //handle the error
  });
```

#### Usage with options
```
let options  = {
  stars: 5,
  perPage: 20
};

client.businessUnit.getReviews('YOUR-BUSINESS-UNIT-ID', options)
  .then(response => {
    //handle the response
  })
  .catch(error => {
      //handle the error
  });
```

```
client.businessUnit.getWebLinks('YOUR-BUSINESS-UNIT-ID', 'en-US')
  .then(response => {
    //handle the response
  })
  .catch(error => {
      //handle the error
  });
```

# Api Methods
  Each method in the api is documented, so feel free to explore what options can be passed to each method.
  Each method listed below will link you to the official [documentation](https://developers.trustpilot.com/) for that method.

## Business Unit Api
  - [listBusinessUnits](https://developers.trustpilot.com/business-unit-api#get-a-list-of-business-units) `businessUnit.listBusinessUnits(options)`
  - [find](https://developers.trustpilot.com/business-unit-api#find-a-business-unit) `businessUnit.find(name)`
  - [get](https://developers.trustpilot.com/business-unit-api#get-a-business-unit) `businessUnit.get(businessUnitId)`
  - [getWebLinks](https://developers.trustpilot.com/business-unit-api#get-a-business-unit's-web-links) `businessUnit.getWebLinks(businessUnitId, locale)`
  - [getReviews](https://developers.trustpilot.com/business-unit-api#get-a-business-unit's-reviews) `businessUnit.getReviews(businessUnitId, options)`
  - [getPrivateReviews](https://developers.trustpilot.com/business-unit-api#business-unit-private-reviews) `businessUnit.getPrivateReviews(businessUnitId, options)`
  - [getPrivateTags](https://developers.trustpilot.com/business-unit-api#get-all-business-unit-private-tags) `businessUnit.getPrivateTags(businessUnitId)`
  - [listCategories](https://developers.trustpilot.com/business-unit-api#list-categories-for-business-unit) `businessUnit.listCategories(businessUnitId)`

## Categories Api
  - [listCategories](https://developers.trustpilot.com/categories-api#list-categories) `categories.listCategories(country, options)`
  - [get](https://developers.trustpilot.com/categories-api#get-category) `categories.get(categoryId, country, options)`
  - [find](https://developers.trustpilot.com/categories-api#find-category) `categories.find(name, country, options)`
  - [listBusinessUnits](https://developers.trustpilot.com/categories-api#list-business-units-in-category) `categories.listBusinessUnits(categoryId, country, options)`
  - [search](https://developers.trustpilot.com/categories-api#search-category) `categories.search(earchQuery, country, queryOptions)`

## Consumer Api
  - [getConsumer](https://developers.trustpilot.com/consumer-api#get-a-consumer) `consumer.getConsumer(consumerId)`
  - [getConsumerReviews](https://developers.trustpilot.com/consumer-api#get-a-consumer's-reviews) `consumer.getConsumerReviews(consumerId, options)`
  - [getConsumerWebLinks](https://developers.trustpilot.com/consumer-api#get-a-consumer's-web-links) `consumer.getConsumerWebLinks(consumerId, locale)`


## Invitation Api
  - [newInvitation](https://developers.trustpilot.com/invitation-api#create-new-invitation) `invitation.newInvitation(businessUnitId, options)`
  - [getTemplates](https://developers.trustpilot.com/invitation-api#get-list-of-invitation-templates) `invitation.getTemplates(businessUnitId)`
  - [generateServiceReviewLink](https://developers.trustpilot.com/invitation-api#generate-service-review-invitation-link) `invitation.generateServiceReviewLink(businessUnitId, options)`

## Product Reviews Api
  - [createInvitationLink](https://developers.trustpilot.com/product-reviews-api#create-product-review-invitation-link) `productReview.createInvitationLink(businessUnitId, options)`
  - [getPrivate](https://developers.trustpilot.com/product-reviews-api#get-private-product-reviews) `productReview.getPrivate(businessUnitId, options)`
  - [getSummariesList](https://developers.trustpilot.com/product-reviews-api#get-product-reviews-summaries-list) `productReview.getSummariesList(businessUnitId, options)`
  - [getPrivateSingle](https://developers.trustpilot.com/product-reviews-api#get-private-product-review) `productReview.getPrivateSingle(reviewId)`
  - [createConversation](https://developers.trustpilot.com/product-reviews-api#create-product-review-conversation) `productReview.createConversation(reviewId)`
  - [getSummary](https://developers.trustpilot.com/product-reviews-api#get-product-reviews-summary) `productReview.getSummary(businessUnitId, options)`
  - [getProductReviews](https://developers.trustpilot.com/product-reviews-api#get-product-reviews) `productReview.getProductReviews(businessUnitId, options)`
  - [getConversation](https://developers.trustpilot.com/product-reviews-api#get-public-conversation) `productReview.getConversation(conversationId)`
  - [createComment](https://developers.trustpilot.com/product-reviews-api#create-comment) `productReview.createComment(conversationId, options)`
  - [getPrivateConversation](https://developers.trustpilot.com/product-reviews-api#get-conversation) `productReview.getPrivateConversation(conversationId)`
  - [saveConversationState](https://developers.trustpilot.com/product-reviews-api#set-conversation-state) `productReview.saveConversationState(conversationId, options)`
  - [getComment](https://developers.trustpilot.com/product-reviews-api#get-comment) `productReview.getComment(conversationId, commentId)`

## Resources Api
  - [getImageNavigationalLinks](https://developers.trustpilot.com/resources-api#contains-navigational-links-to-all-image-resources) `resources.getImageNavigationalLinks()`
  - [getStarImages](https://developers.trustpilot.com/resources-api#get-the-star-image-resources) `resources.getStarImages(stars)`
  - [getLogoImages](https://developers.trustpilot.com/resources-api#get-the-trustpilot-logo-images) `resources.getLogoImages()`
  - [getTrustpilotIconImages](https://developers.trustpilot.com/invitation-api#create-new-invitation) `resources.getTrustpilotIconImages()`
  - [getSupportedLocales](https://developers.trustpilot.com/resources-api#get-trustpilot-supported-locales) `resources.getSupportedLocales()`
  - [getKnownCountries](https://developers.trustpilot.com/resources-api#get-all-countries-known-to-trustpilot) `resources.getKnownCountries()`
  - [getStringRepresentationOfStars](https://developers.trustpilot.com/resources-api#get-the-string-representation-of-the-stars) `resources.getStringRepresentationOfStars(options)`

## Service Review Api
  - [getLatest](https://developers.trustpilot.com/service-reviews-api#get-latest-reviews-by-language) `review.getLatest(lang, options)`
  - [get](https://developers.trustpilot.com/service-reviews-api#get-a-review) `review.get(reviewId)`
  - [getPrivate](https://developers.trustpilot.com/service-reviews-api#get-private-review) `review.getPrivate(reviewId)`
  - [getWebLinks](https://developers.trustpilot.com/service-reviews-api#get-a-review's-web-links) `review.getWebLinks(reviewId, locale)`
  - [getLikes](https://developers.trustpilot.com/service-reviews-api#get-a-review's-likes) `review.getLikes(reviewId)`
  - [getTags](https://developers.trustpilot.com/service-reviews-api#get-tags-on-review) `review.getTags(reviewId)`
  - [saveTags](https://developers.trustpilot.com/service-reviews-api#set-tags-on-review) `review.saveTags(reviewId, postObject)`
  - [reply](https://developers.trustpilot.com/service-reviews-api#reply-to-a-review) `review.reply(reviewId, postObject)`
  - [deleteReply](https://developers.trustpilot.com/service-reviews-api#delete-a-reply-to-a-review-) `review.deleteReply(reviewId)`
