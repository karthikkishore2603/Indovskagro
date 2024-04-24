import React from 'react';
import axios from 'axios';

export default async function SendWhatsappMessage(name: string, number: string, orderID: string) {
    console.log("Sending WhatsApp message...");
    const url = 'https://graph.facebook.com/v18.0/106885295759687/messages';
    const accessToken = 'YOUR_FACEBOOK_ACCESS_TOKEN'; // Replace with your Facebook access token
    const headers = {
        'Authorization': 'Bearer EAAK3LGk3JkABOZCSDCmcnUqz1AT5HIDKPJ8aV2lQZBKx0aqD7mLzaJtEJtMcdqcZBds7yG7w4NqSN0BRxm1T5xUlO8j3BvZA9yonFgy5nwYZBxRLtV1TGyTVVBCaZCNZCZCohFZCVvEzp0FsXNK12C7ZAZC1Sm6nl2g0YEmAfLv77NXAoSu6vSxq5yvzAgy4dSNLy32IIYZBzuUqNMzhzriY2f47vZCmJ6h4klI8HZBnoHs7YZD',
        'Content-Type': 'application/json'
    };
    console.log("Sending WhatsApp message...2");
    const payload = {
        "messaging_product": "whatsapp",
        "to": number, 
        "type": "template",
        "template": {
            "name": "order_confirmation",
            "language": {
                "code": "en"
            },
            "components": [
                {
                    "type": "BODY",
                    "parameters": [
                        {
                            "type": "text",
                            "text": name
                        },
                        {
                            "type": "text",
                            "text": orderID
                        },
                    ]
                }
            ]
        }
    };

    const response = await axios.post(url, payload, { headers });

    if (response.status === 200) {
        console.log("Message sent successfully.");
    } else {
        console.error("Failed to send message.");
    }

    return;
};

