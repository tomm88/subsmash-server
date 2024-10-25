const db = require('../database/models');
const {broadcastToStreamers} = require('../websockets/subSmashWebsocket/websocketState');

const handleGiftSub = async (data) => {

    const streamerTwitchId = data.broadcaster_user_id;
    const gifterTwitchId = data.user_id;
    const gifterTwitchUsername = data.user_name;
    const tier = data.tier;
    const type = "gift_sub";
    const numberOfGifts = data.total;
    let formattedData;

    //Find the data for the streamer
    const streamer = await db.Streamer.findOne({
        where: {
            twitch_id: streamerTwitchId
        }
    });

    //Check if the gifter exists in the database as a subscriber at all (to any SubSmash user)
    const gifter = await db.Subscriber.findOne({
        where: {
            twitch_id: gifterTwitchId
        }
    });

    if (gifter) {
        //Check if the gifter is a subscriber to the streamer
        const gifterSubscription = await db.StreamerSubscriber.findOne({
            where :{
                streamer_id: streamer.id,
                subscriber_id: gifter.id,
                active: true
            },
            include: [{
                model: db.Character,
                attributes: ['character_name', 'image_url']
            }]
        });

        //If the gifter has an active subscription to the streamer, with an associated character 
        //display their character image and name with the gift alert and return out of the function
        if(gifterSubscription.Character) {
            formattedData = {
                gifterTwitchUsername,
                characterName: gifterSubscription.Character.character_name,
                imageUrl: gifterSubscription.Character.image_url,
                numberOfGifts,
                tier
            };

            broadcastToStreamers(streamer.id, type, formattedData);
            return formattedData;
        }
    }

    //If no active subscription to the streamer was found for the gifter, or they don't have a character, 
    //return a placeholder image and name for the alert, along with the rest of the data about the gift
    const placeholder = await db.Character.findOne({
        where: {
            id: 69
        }
    });

    formattedData = {
        gifterTwitchUsername,
        characterName: placeholder.character_name,
        imageUrl: placeholder.image_url,
        numberOfGifts,
        tier
    };

    broadcastToStreamers(streamer.id, type, formattedData);
    return formattedData;
}

module.exports = handleGiftSub;