const axios = require('axios');
const config = require('../../config/config');

//This is the test EventSub subscription that getTwitchWebsocketSessionId (in database_utilities) calls before returning websocket session data to confirm a session is active
const testEventSubSubscription = async (streamerTwitchId, sessionTwitchId, accessToken) => {
    let subscriptionId
    try {
        const createResponse = await axios.post(config.TWITCH_EVENTSUB_URL, {
            type: 'channel.subscription.end',
            version: '1',
            condition: {
                "broadcaster_user_id": streamerTwitchId
            },
            transport: {
                method: 'websocket',
                session_id: sessionTwitchId
            }
        }, {
            headers: {
                'Client-ID': config.TWITCH_CLIENT_ID,
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        subscriptionId = createResponse.data.data[0].id;

        //Close test EventSub subscription immediately after successful connection and return "success"
        if (subscriptionId) {
            try {
                const response = await axios.delete(`${config.TWITCH_EVENTSUB_URL}?id=${subscriptionId}`, {
                    headers: {
                        'Client-ID': config.TWITCH_CLIENT_ID,
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                if (response.status === 204) {
                    return 'success';
                } else console.log("Non-204 response received:", response)
            } catch (error) {
                console.error(`Failed to unsubscribe from test subscription ${subscriptionId}:`, error.response ? error.response.data : error.message)
            }
        }
        } catch(error) {
            if (error.response && error.response.status === 400){
                console.log(`Expired websocket session detected with id ${sessionTwitchId}. Creating a new one...`)
                return error.response.status
            }
            console.error('Error creating test EventSub subscription', error.response.data)
        }
}

module.exports = testEventSubSubscription;