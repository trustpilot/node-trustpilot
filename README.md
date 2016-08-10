# Trustpilot node.js API  [![Build Status][travis-image]][travis-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

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
  - [listBusinessUnits](https://developers.trustpilot.com/business-unit-api#Get a list of business units) `businessUnit.listBusinessUnits(options)`
  - [find](https://developers.trustpilot.com/business-unit-api#Find a business unit) `businessUnit.find(name)`
  - [get](https://developers.trustpilot.com/business-unit-api#Get a business unit) `businessUnit.get(businessUnitId)`
  - [getWebLinks](https://developers.trustpilot.com/business-unit-api#Get a business unit's web links) `businessUnit.getWebLinks(businessUnitId, locale)`
  - [getReviews](https://developers.trustpilot.com/business-unit-api#Get a business unit's reviews) `businessUnit.getReviews(businessUnitId, options)`
  - [getPrivateReviews](https://developers.trustpilot.com/business-unit-api#Business unit private reviews) `businessUnit.getPrivateReviews(businessUnitId, options)`
  - [getPrivateTags](https://developers.trustpilot.com/business-unit-api#Get all business unit private tags) `businessUnit.getPrivateTags(businessUnitId)`
  - [listCategories](https://developers.trustpilot.com/business-unit-api#List categories for business unit) `businessUnit.listCategories(businessUnitId)`

## Categories Api
  - [listCategories](https://developers.trustpilot.com/categories-api#List categories) `categories.listCategories(country, options)`
  - [get](https://developers.trustpilot.com/categories-api#Get category) `categories.get(categoryId, country, options)`
  - [find](https://developers.trustpilot.com/categories-api#Find category) `categories.find(name, country, options)`
  - [listBusinessUnits](https://developers.trustpilot.com/categories-api#List business units in category) `categories.listBusinessUnits(categoryId, country, options)`
  - [search](https://developers.trustpilot.com/categories-api#Search category) `categories.search(earchQuery, country, queryOptions)`

## Consumer Api
  - [getConsumer](https://developers.trustpilot.com/consumer-api#Get a consumer) `consumer.getConsumer(consumerId)`
  - [getConsumerReviews](https://developers.trustpilot.com/consumer-api#Get a consumer's reviews) `consumer.getConsumerReviews(consumerId, options)`
  - [getConsumerWebLinks](https://developers.trustpilot.com/consumer-api#Get a consumer's web links) `consumer.getConsumerWebLinks(consumerId, locale)`


## Invitation Api
  - [newInvitation](https://developers.trustpilot.com/invitation-api#Create new invitation) `invitation.newInvitation(businessUnitId, options)`
  - [getTemplates](https://developers.trustpilot.com/invitation-api#Get list of invitation templates) `invitation.getTemplates(businessUnitId)`
  - [generateServiceReviewLink](https://developers.trustpilot.com/invitation-api#Generate service review invitation link) `invitation.generateServiceReviewLink(businessUnitId, options)`

## Product Reviews Api
  - [createInvitationLink](https://developers.trustpilot.com/product-reviews-api#Create product review invitation link) `productReview.createInvitationLink(businessUnitId, options)`
  - [getPrivate](https://developers.trustpilot.com/product-reviews-api#Get private product reviews) `productReview.getPrivate(businessUnitId, options)`
  - [getSummariesList](https://developers.trustpilot.com/product-reviews-api#Get product reviews summaries list) `productReview.getSummariesList(businessUnitId, options)`
  - [getPrivateSingle](https://developers.trustpilot.com/product-reviews-api#Get private product review) `productReview.getPrivateSingle(reviewId)`
  - [createConversation](https://developers.trustpilot.com/product-reviews-api#Create product review conversation) `productReview.createConversation(reviewId)`
  - [getSummary](https://developers.trustpilot.com/product-reviews-api#Get product reviews summary) `productReview.getSummary(businessUnitId, options)`
  - [getProductReviews](https://developers.trustpilot.com/product-reviews-api#Get product reviews) `productReview.getProductReviews(businessUnitId, options)`
  - [getConversation](https://developers.trustpilot.com/product-reviews-api#Get public conversation) `productReview.getConversation(conversationId)`
  - [createComment](https://developers.trustpilot.com/product-reviews-api#Create comment) `productReview.createComment(conversationId, options)`
  - [getPrivateConversation](https://developers.trustpilot.com/product-reviews-api#Get conversation) `productReview.getPrivateConversation(conversationId)`
  - [saveConversationState](https://developers.trustpilot.com/product-reviews-api#Set conversation state) `productReview.saveConversationState(conversationId, options)`
  - [getComment](https://developers.trustpilot.com/product-reviews-api#Get comment) `productReview.getComment(conversationId, commentId)`

## Resources Api
  - [getImageNavigationalLinks](https://developers.trustpilot.com/resources-api#Contains navigational links to all image resources) `resources.getImageNavigationalLinks()`
  - [getStarImages](https://developers.trustpilot.com/resources-api#Get the star image resources) `resources.getStarImages(stars)`
  - [getLogoImages](https://developers.trustpilot.com/resources-api#Get the Trustpilot logo images) `resources.getLogoImages()`
  - [getTrustpilotIconImages](https://developers.trustpilot.com/invitation-api#Create new invitation) `resources.getTrustpilotIconImages()`
  - [getSupportedLocales](https://developers.trustpilot.com/resources-api#Get Trustpilot supported locales) `resources.getSupportedLocales()`
  - [getKnownCountries](https://developers.trustpilot.com/resources-api#Get all countries known to Trustpilot) `resources.getKnownCountries()`
  - [getStringRepresentationOfStars](https://developers.trustpilot.com/resources-api#Get the string representation of the stars) `resources.getStringRepresentationOfStars(options)`

## Review Api
  - [getLatest](https://developers.trustpilot.com/review-api#Get latest reviews by language) `review.getLatest(lang, options)`
  - [get](https://developers.trustpilot.com/review-api#Get a review) `review.get(reviewId)`
  - [getPrivate](https://developers.trustpilot.com/review-api#Get private review) `review.getPrivate(reviewId)`
  - [getWebLinks](https://developers.trustpilot.com/review-api#Get a review's web links) `review.getWebLinks(reviewId, locale)`
  - [getLikes](https://developers.trustpilot.com/review-api#Get a review's likes) `review.getLikes(reviewId)`
  - [getTags](https://developers.trustpilot.com/review-api#Get tags on review) `review.getTags(reviewId)`
  - [saveTags](https://developers.trustpilot.com/review-api#Set tags on review) `review.saveTags(reviewId, postObject)`
  - [reply](https://developers.trustpilot.com/review-api#Reply to a review.) `review.reply(reviewId, postObject)`
  - [deleteReply](https://developers.trustpilot.com/review-api#Delete a reply to a review.) `review.deleteReply(reviewId)`



[travis-url]: https://travis-ci.org/trustpilot/trustpilot-node-sdk
[travis-image]: http://img.shields.io/travis/trustpilot/trustpilot-node-sdk.svg
[david-dm-url]:https://david-dm.org/trustpilot/trustpilot-node-sdk
[david-dm-image]:https://david-dm.org/trustpilot/trustpilot-node-sdk.svg
[david-dm-dev-url]:https://david-dm.org/trustpilot/trustpilot-node-sdk#info=devDependencies
[david-dm-dev-image]:https://david-dm.org/trustpilot/trustpilot-node-sdk/dev-status.svg
