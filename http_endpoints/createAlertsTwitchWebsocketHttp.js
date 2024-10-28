const wsManager = require('../websockets/twitchWebsocket/wsManager');
const getTokensFromDatabase = require('../database/database_utilities/getTokensFromDatabase');
const newTwitchWebsocketConnection = require('../websockets/twitchWebsocket/newTwitchWebsocketConnection');
const createEventSubSubsciption = require('../websockets/twitchWebsocket/createEventSubSubscription');
const awaitValidWebsocketId = require('../websockets/twitchWebsocket/awaitValidWebsocketId');

const createAlertsTwitchWebsocketHttp = async (req, res) => {
    const { hash } = req.body;
    const subscriptionTypes = ['channel.subscribe', "channel.subscription.message", "channel.subscription.gift", "channel.follow"];

    try {
        const streamer = await getTokensFromDatabase(hash);

        if (!wsManager.getWebSocket(streamer.streamerDatabaseId)) {
            await newTwitchWebsocketConnection(streamer, subscriptionTypes);
            return;
        }
        
        const socket = await awaitValidWebsocketId(streamer.streamerDatabaseId);
        
        for (type of subscriptionTypes) {
            if (!wsManager.subscriptionExists(streamer.streamerDatabaseId, type)) {
                await createEventSubSubsciption(type, socket.id, streamer.accessToken, streamer.streamerDatabaseId, streamer.streamerTwitchId)
            }
        }

        res.status(200).json({ success: true, message: 'Alerts Eventsub established'})


    } catch (error) {
        console.error("Error creating slideshow EventSub subscriptions", error)
    }
    
};

module.exports = createAlertsTwitchWebsocketHttp