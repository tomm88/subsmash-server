const wsManager = require('../websockets/twitchWebsocket/wsManager');
const createEventSubSubsciption = require('../websockets/twitchWebsocket/createEventSubSubscription');

const handleSessionWelcome = async (streamer, sessionId, subscriptionTypes) => {
    
    wsManager.setWebSocketId(streamer.streamerDatabaseId, sessionId);

    const socket = wsManager.getWebSocket(streamer.streamerDatabaseId);

    console.log('Websocket connected for streamer', streamer.streamerDatabaseId, "with id:", sessionId);

    for (type of subscriptionTypes) {
        if (!wsManager.subscriptionExists(streamer.streamerDatabaseId, type)) {
            await createEventSubSubsciption(type, socket.id, streamer.accessToken, streamer.streamerDatabaseId, streamer.streamerTwitchId)
        }
    }

}

module.exports = handleSessionWelcome;