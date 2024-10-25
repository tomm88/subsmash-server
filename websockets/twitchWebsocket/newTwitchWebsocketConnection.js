const WebSocket = require('ws');
const handleTwitchEvent = require('../../eventHandlers/handleTwitchEvent');
const wsManager = require('./wsManager');
const config = require('../../config/config');

const newTwitchWebsocketConnection = async (streamer, subscriptionTypes, isReconnect, reconnectUrl) => {
    let twitchWebsocketUrl = config.TWITCH_WEBSOCKET_URL;
    if (reconnectUrl) {
        twitchWebsocketUrl = reconnectUrl;
    } else {
        if (wsManager.getWebSocket(streamer.streamerDatabaseId)) return;
        wsManager.setWebSocket("Connecting...", streamer.streamerDatabaseId, []);
    }
    //Creates a new websocket connection to Twitch's EventSub
    //Called from getTwitchWebsocketSessionId in database_utilities if no active websocket is found in database
    return new Promise((resolve, reject) => {
        let ws = new WebSocket(twitchWebsocketUrl);

        ws.on('open', () => {
            if (!isReconnect) {
                wsManager.setWebSocket(ws, streamer.streamerDatabaseId, []);
            }
            console.log('Connected to the Twitch WebSocket server');
        });

        ws.on('message', async (data) => {
            const message = JSON.parse(data);
            const newSessionInfo = await handleTwitchEvent(message, ws, streamer, subscriptionTypes, isReconnect);
            if(message.metadata.message_type === 'session_welcome') {
                resolve(newSessionInfo);
            }
        });

        ws.on('close', async (code, reason) => {
            console.log(`Websocket session ${ws.websocketSessionId} was disconnected from the Twitch WebSocket server with code ${code} and reason ${reason}`);
        });

        ws.on('error', (error) => {
            console.error('WebSocket error:', error);
            wsManager.closeWebSocket(streamer.streamerDatabaseId);
            reject(error)
        });
    })
}


module.exports = newTwitchWebsocketConnection;
