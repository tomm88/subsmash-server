const db = require('../models');
const getStreamerFromHash = require('./getStreamerFromHash')

//Gets all subscribers for a streamer, even if their subscription has expired
//Expired subs will have a false "active" value in the return statement
const getSubscribersFromDatabase = async (slideshowHash) => {
    try {
        //Finds streamer in database using their slideshow hash
        const streamer = await getStreamerFromHash(slideshowHash)

        //Finds all subscribers with a subscription record associated with the streamer
        //Returns their Twitch username and all their SubSmash character info
        const subscribers = await db.StreamerSubscriber.findAll({
            where: { 
                streamer_id: streamer.id
            },
            include: [
                {
                    model: db.Subscriber,
                    attributes: ['twitch_username']
                },
                {
                    model: db.Character,
                    attributes: ['character_name', 'user_prompt', 'image_url'],
                    required: false
                }
            ]
        });

        //Formats the data and sends it, with edge-case for no character
        //Subscriber may not have a character if they subscribed while the streamer was offline / not connected to SubSmash
        const formattedSubscribers = subscribers.map(sub => {
            const char = sub.Character || {};
                return {
                id: sub.id,
                subscriberTwitchUsername: sub.Subscriber.twitch_username,
                subscriptionTier: sub.subscription_tier,
                characterName: char.character_name || "No character name",
                userPrompt: char.user_prompt || "No prompt",
                imageUrl: char.image_url || "No character image",
                active: sub.active
            }
        });

        return formattedSubscribers;

    } catch(error) {
        console.error(error, "Could not fetch subscribers from database")
    }
}

module.exports = getSubscribersFromDatabase;