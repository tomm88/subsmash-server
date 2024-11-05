const db = require('../models');
const generateNewCharacter = require('../../controllers/openAiApiControllers/generateNewCharacter');
const createCharacterRecord = require('./createCharacterRecord');

const createSubscriber = async (streamerDatabaseId, subscriberDatabaseId, subscriberTwitchUsername, tier, isGift) => {

    try {

        const { characterName, userPrompt, imageUrl, fileName } = await generateNewCharacter(streamerDatabaseId);
        const newChar = await createCharacterRecord(characterName, userPrompt, imageUrl, fileName);

        const [subscriber, subscriberCreated] = await db.StreamerSubscriber.findOrCreate({
            where: {
                streamer_id: streamerDatabaseId,
                subscriber_id: subscriberDatabaseId,  
            },
            defaults: {
                character_id: newChar.id,
                subscription_tier: tier
            }
        })

        if (!subscriberCreated && !subscriber.character_id){
            subscriber.update({
                character_id: newChar.id,
                subscription_tier: tier
            })
        }

        const formattedData = {
            subscriberTwitchUsername,
            characterName,
            imageUrl,
            tier,
            isGift
        }

        return formattedData;

    } catch(error) {
        console.error('Error creating the character: ', error)
    }
}

module.exports = createSubscriber;