const { broadcastToStreamers } = require('../websockets/subSmashWebsocket/websocketState');
const createSubscriber = require('../database/database_utilities/createSubscriber')
const getStreamerAndSubscriber = require('../database/database_utilities/getStreamerAndSubscriber');
const subscriptionExists = require('../database/database_utilities/subscriptionExists');

const handleNewSubscriber = async (data) => {

    const streamerTwitchId = data.broadcaster_user_id;
    const subscriberTwitchId = data.user_id;
    const subscriberTwitchUsername = data.user_name;
    const tier = data.tier;
    const type = "new_subscriber";
    const isGift = data.is_gift;

    //Get usernames of streamer and subscriber for creating new subscriber record in database
    const streamerAndSubscriberInfo = await getStreamerAndSubscriber(streamerTwitchId, subscriberTwitchId, subscriberTwitchUsername);
    const { streamerDatabaseId, subscriberDatabaseId } = streamerAndSubscriberInfo;

    //Check if the subscriber already exists
    const character = await subscriptionExists(streamerDatabaseId, subscriberDatabaseId);

    //Sends alert with existing subscription data if so
    if (character) {
        const subData = {
            subscriberTwitchUsername,
            characterName: character.name,
            imageUrl: character.url,
            tier,
            isGift
        }
        broadcastToStreamers(streamerDatabaseId, type, subData)
        return subData;
    }

    //If no subscription exists, create new subscriber
    const newSubscriber = await createSubscriber(streamerDatabaseId, subscriberDatabaseId, subscriberTwitchUsername, tier, isGift);
    
    broadcastToStreamers(streamerDatabaseId, type, newSubscriber);

    return newSubscriber;

}

module.exports = handleNewSubscriber;