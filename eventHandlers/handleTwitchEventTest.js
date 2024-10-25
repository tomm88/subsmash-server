const {broadcastToStreamers} = require('../websockets/subSmashWebsocket/websocketState')

const handleTwitchEventTest = (testData, streamerDatabaseId) => {
    try {
        broadcastToStreamers(streamerDatabaseId, testData.type, testData);
    } catch (error) {
        console.error('Failed to send alert notification to client', error)
    }
}

module.exports = handleTwitchEventTest;