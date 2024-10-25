const db = require('../models');

//Function for getting data for a streamer and a subscriber from the database
//Used for querying the streamer_subscriber table
const getStreamerAndSubscriber = async (
    streamerTwitchId, 
    subscriberTwitchId, 
    subscriberTwitchUsername 
) => {

    try {
        const streamer = await db.Streamer.findOne({
            where: {
                twitch_id: streamerTwitchId
            }
        });

        const [newSubscriber, newSubscriberCreated] = await db.Subscriber.findOrCreate({
            where: {
                twitch_id: subscriberTwitchId
            },
            defaults: {
                twitch_username: subscriberTwitchUsername
            }
        });

        return {
            streamerDatabaseId: streamer.id, 
            subscriberDatabaseId: newSubscriber.id
        };

    } catch (error) {
        console.error('Error getting streamer and subscriber info from database: ', error)
    }
}

module.exports = getStreamerAndSubscriber;