'use strict';

class Invitation {
  constructor (request) {
    this.request = request;
  }

  /**
   * [This API endpoint triggers an email invitation. Use the redirect parameter to pass in a product review invitation link. preferredSendTime must be in UTC if specified.]
   * {@link https://developers.trustpilot.com/invitation-api#create-new-invitation}
   * @param {[string]} businessUnitId [required. The ID of the business unit. ]
   * @param {[object]} options [request data]
   * @example request options
   * {
      recipientEmail: 'john.doe@trustpilot.com',
      recipientName: 'John Doe',
      referenceId: 'inv00001',
      templateId: '46d6a890000064000500e0c3',
      locale: 'en-US',
      senderEmail: 'john.doe@trustpilot.com',
      senderName: 'John Doe',
      replyTo: 'john.doe@trustpilot.com',
      preferredSendTime: '2013-09-07T13:37:00',
      tags: [
        tag1,
        tag2
      ],
      redirectUri: 'http://trustpilot.com'
    }
   *@return {[object]} [object containing invitation information]
   */
  newInvitation (businessUnitId, options) {
    if (!businessUnitId) { throw new Error('businessUnitId is not present'); }

    return this.request.invitationsRequest(`/v1/private/business-units/${businessUnitId}/invitations`, true, options, 'POST');
  }

  /**
   * [Returns a list of ID and Names of the templates available to be used in invitations. Includes both standard and custom templates.]
   * {@link https://developers.trustpilot.com/invitation-api#get-list-of-invitation-templates}
   * @param {[string]} [required. The ID of the business unit.]
   * @return {[object]} [object containing information about all the invitation templates]
   */
  getTemplates (businessUnitId) {
    if (!businessUnitId) { throw new Error('businessUnitId is not present'); }

    return this.request.invitationsRequest(`/v1/private/business-units/${businessUnitId}/templates`, true, {}, 'GET');
  }

  /**
   * [Generate a unique invitation link that can be sent to a consumer by email or website. Use the request parameter
   * called redirectURI to take the user to a product review link after the user has left a service review.]
   * {@link https://developers.trustpilot.com/invitation-api#generate-service-review-invitation-link}
   *@param {[string]} businessUnitId [required. ID of the businessUnit]
   *@param {[object]} options [post body object]
   *@example post body
   {
     referenceId: 'inv00001',
     email: 'john.doe@trustpilot.com',
     name: 'John Doe',
     locale: 'en-US',
     tags: [
       'tag1',
       'tag2'
     ],
     redirectUri: 'http://trustpilot.com'
   }
   *@return {[object]} [object containing service review inviration link id and url]
   */
  generateServiceReviewLink (businessUnitId, options) {
    if (!businessUnitId) { throw new Error('businessUnitId is not present'); }

    return this.request.invitationsRequest(`/v1/private/business-units/${businessUnitId}/invitation-links`, true, options, 'POST');
  }
}

module.exports = Invitation;
