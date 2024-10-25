const { broadcastToStreamers } = require('../websockets/subSmashWebsocket/websocketState');

const handleFollow = async (data, streamerDatabaseId) => {

    const type = 'follow';

    const followerData = {
        followerTwitchUsername: data.user_name,
        imageUrl: 'subNotFound___123.png',
        characterName: 'Follower',
        tier: 'none'
    }

    broadcastToStreamers(streamerDatabaseId, type, followerData)
}

module.exports = handleFollow;