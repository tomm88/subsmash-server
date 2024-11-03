const axios = require('axios');
const config = require('../../config/config');
const wsManager = require('./wsManager');

const createEventSubSubsciption = async (type, websocketId, accessToken, streamerDatabaseId, streamerTwitchId) => {

    try {    
        wsManager.addSubscription(streamerDatabaseId, type)

        
        let version = '1'; 
        let condition = {
            broadcaster_user_id: streamerTwitchId,
        }

        if (type === "channel.follow") {
            version = '2';
            condition = {
                broadcaster_user_id: streamerTwitchId,
                moderator_user_id: streamerTwitchId
            }
        }

        if (type === "channel.raid") {
            condition = {
                to_broadcaster_user_id: streamerTwitchId
            }
        }

        const response = await axios.post(config.TWITCH_EVENTSUB_URL, {
            type,
            version,
            condition,
            transport: {
                method: 'websocket',
                session_id: websocketId
            }
        }, {
            headers: {
                'Client-ID': config.TWITCH_CLIENT_ID,
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        const subscriptionId = response.data.data[0].id;

        wsManager.updateSubscription(streamerDatabaseId, subscriptionId, type)
        console.log("EventSub subscription created for streamer", streamerDatabaseId, "of type", type)
        return { success: true, message: `EventSub subscription created for streamer", ${streamerDatabaseId}, "of type", ${type}`}
    } catch (error) {
        console.error("Could not create EventSub subscription for streamer", streamerDatabaseId, "of type", type, error.response.data, error.config.data)
    }
}

module.exports = createEventSubSubsciption;

