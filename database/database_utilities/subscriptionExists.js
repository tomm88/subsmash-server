const db = require('../models');

const subscriptionExists = async (streamerDatabaseId, subscriberDatabaseId) => {
    try {
        const subscription = await db.StreamerSubscriber.findOne({
            where: {
                streamer_id: streamerDatabaseId,
                subscriber_id: subscriberDatabaseId
            }
        });

        if(subscription && subscription.character_id) {
            const character = await db.Character.findOne({
                where: {
                    id: subscription.character_id
                }
            });
            return {
                name: character.character_name,
                url: character.image_url
            }
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error checking if subscription exists:', error)
    }
}

module.exports = subscriptionExists;