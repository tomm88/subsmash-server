const { broadcastToStreamers } = require('../websockets/subSmashWebsocket/websocketState');

const handleFollow = async (data, streamerDatabaseId) => {

    const type = 'follower';

    const followerData = {
        followerTwitchUsername: data.user_name
    }

    broadcastToStreamers(streamerDatabaseId, type, followerData);

    return followerData
}

module.exports = handleFollow;