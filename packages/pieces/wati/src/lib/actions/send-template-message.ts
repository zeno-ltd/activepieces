import { createAction, Property } from "@activepieces/pieces-framework";
import { httpClient, HttpMethod } from "@activepieces/pieces-common";

import { watiAuth } from "../../";

export const sendTemplateMessage = createAction({
    auth: watiAuth,
    name: 'send-template-message',
    displayName: "send template message",
    description: "Send an approved business template message",
    props: {
        templateName: Property.ShortText({
            displayName: 'Approved Template Name',
            required: true,
        }),
        broadcastName: Property.ShortText({
            displayName: 'Broadcast Name',
            required: true,
        }),
        whatsappNumber: Property.ShortText({
            displayName: 'Whatsapp number',
            required: true,
        }),
        properties: Property.Json({
            displayName: 'Custom properties',
            description: 'Custom properties to be used in the template, format JSON',
            required: false,
            defaultValue: [{
                "name": "name",
                "value": "John"
            }],
        }),
    },
    async run(context) {
        const { url, token } = context.auth;
        const { templateName, broadcastName, whatsappNumber, properties } = context.propsValue;
        const response = await httpClient.sendRequest({
            method: HttpMethod.POST,
            url: `${url}/api/v1/sendTemplateMessage`,
            headers: {
                "Authorization": 'Bearer ' + token
            },
            body: {
                template_name: templateName,
                broadcast_name: broadcastName,
                parameters: properties,
            },
            queryParams: {
                whatsappNumber: whatsappNumber
            }
        })
        return response.body;
    }
})
