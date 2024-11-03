const { broadcastToStreamers } = require('../websockets/subSmashWebsocket/websocketState');

const handleRaid = async (data, streamerDatabaseId) => {

    const type = 'raid';

    const raidData = {
        raiderTwitchUsername: data.from_broadcaster_user_name,
        viewers: data.viewers
    }

    broadcastToStreamers(streamerDatabaseId, type, raidData);
    return raidData;
}

module.exports = handleRaid;