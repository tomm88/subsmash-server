const cron = require('node-cron');
const wsManager = require('../websockets/twitchWebsocket/wsManager');
const websocketState = require('../websockets/subSmashWebsocket/websocketState');

const cleanupTwitchWebsocketConnections = () => {
    try {
        cron.schedule('*/5 * * * *', async () => {
            console.log("In websocket cleaning CronJob - running cleanup")

            const clients = websocketState.getAllClients();
            // const allSockets = wsManager.getAllWebsockets();
            // console.log("In cleanup CronJob - full websockets looks like", allSockets)
            // console.log("In cleanup CronJob - full clients looks like", clients)


            Object.keys(clients).forEach((streamerDatabaseId) => {
                if (clients[streamerDatabaseId].size === 0) {
                    wsManager.closeWebSocket(streamerDatabaseId);
                    websocketState.deleteClientSet(streamerDatabaseId);
                    console.log("Websocket closed for streamer", streamerDatabaseId)
                }
            })

        })
    } catch (error) {
        console.error("Error running websocket cleanup", error);
    }
}

module.exports = cleanupTwitchWebsocketConnections;