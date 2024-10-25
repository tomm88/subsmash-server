const { broadcastToStreamers } = require('../websockets/subSmashWebsocket/websocketState');
const createSubscriber = require('../database/database_utilities/createSubscriber')
const getStreamerAndSubscriber = require('../database/database_utilities/getStreamerAndSubscriber');

const handleNewSubscriber = async (data) => {

    const streamerTwitchId = data.broadcaster_user_id;
    const subscriberTwitchId = data.user_id;
    const subscriberTwitchUsername = data.user_name;
    const tier = data.tier;
    const type = "new_subscriber";

    //Get usernames of streamer and subscriber for creating new subscriber record in database
    const streamerAndSubscriberInfo = await getStreamerAndSubscriber(streamerTwitchId, subscriberTwitchId, subscriberTwitchUsername);
    const { streamerDatabaseId, subscriberDatabaseId } = streamerAndSubscriberInfo;

    //Creates new subscriber record in database
    const newSubscriber = await createSubscriber(streamerDatabaseId, subscriberDatabaseId, subscriberTwitchUsername, tier);
    
    broadcastToStreamers(streamerDatabaseId, type, newSubscriber)

    return newSubscriber;

}

module.exports = handleNewSubscriber;