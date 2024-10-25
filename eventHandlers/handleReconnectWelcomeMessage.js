const wsManager = require('../websockets/twitchWebsocket/wsManager')

const handleReconnectWelcomeMessage = async (streamerDatabaseId, websocketId, ws) => {
    wsManager.setWsAfterReconnect(streamerDatabaseId, websocketId, ws)
};

module.exports = handleReconnectWelcomeMessage;