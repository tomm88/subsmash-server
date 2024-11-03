const { broadcastToStreamers } = require('../websockets/subSmashWebsocket/websocketState');

const handleCheer = async (data, streamerDatabaseId) => {

    const type = 'cheer';

    console.log('in handleCheer: ', data)

    const cheerData = {
        cheererTwitchUsername: data.user_name || 'anonymous',
        cheerMessage: data.message,
        bits: data.bits
    }

    broadcastToStreamers(streamerDatabaseId, type, cheerData);

    return cheerData
}

module.exports = handleCheer;