const getStreamerAndSubscriber = require('../database/database_utilities/getStreamerAndSubscriber');
const db = require('../database/models');
const createSubscriber = require('../database/database_utilities/createSubscriber');
const {broadcastToStreamers} = require('../websockets/subSmashWebsocket/websocketState');

const handleResub = async (data) => {

    const streamerTwitchId = data.broadcaster_user_id;
    const subscriberTwitchId = data.user_id;
    const subscriberTwitchUsername = data.user_name;
    const cumulativeMonths = data.cumulative_months;
    const tier = data.tier;
    const type = "resub";
    const message = data.message.text;
    let formattedData;

    //Get usernames of streamer and subscriber for finding or creating new subscriber record in database
    const streamerAndSubscriberInfo = await getStreamerAndSubscriber(streamerTwitchId, subscriberTwitchId, subscriberTwitchUsername);
    const { streamerDatabaseId, subscriberDatabaseId } = streamerAndSubscriberInfo;

    //Check if subscription already exists in database
    //If it does, format subscriber and character data for alert broadcast
    const existingSub = await db.StreamerSubscriber.findOne({
        where: {
            streamer_id: streamerDatabaseId,
            subscriber_id: subscriberDatabaseId
        }
    })

    if (existingSub && existingSub.character_id) {
        await existingSub.update({
            active: true
        });
        const subscriberCharacter = await db.Character.findOne({
            where: {
                id: existingSub.character_id
            }
        })
        formattedData = {
            subscriberTwitchUsername,
            characterName: subscriberCharacter.character_name,
            imageUrl: subscriberCharacter.image_url,
            tier,
            cumulativeMonths,
            message
        }

        broadcastToStreamers(streamerDatabaseId, type, formattedData);
        return formattedData
    }

    //If subscriber does not exist in database, create a new subscription and character for them
    //Format the data for alert broadcast
    const newSub = await createSubscriber(streamerDatabaseId, subscriberDatabaseId, subscriberTwitchUsername, tier)
    const { characterName, imageUrl } = newSub;

    formattedData = {
        subscriberTwitchUsername,
        characterName,
        imageUrl,
        tier,
        cumulativeMonths,
        message
    }


    broadcastToStreamers(streamerDatabaseId, type, formattedData);
    return formattedData
}

module.exports = handleResub;