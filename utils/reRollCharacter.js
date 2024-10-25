const db = require('../database/models');
const newCharacter = require('../controllers/openAiApiControllers/generateNewCharacter');
const createCharacterRecord = require('../database/database_utilities/createCharacterRecord');
const { broadcastToStreamers } = require('../websockets/subSmashWebsocket/websocketState')

const reRollCharacter = async (req, res) => {

    const { subscriberTwitchUsername } = req.body;
    const type = "reroll";

    const streamerDatabaseId = req.session.streamerDatabaseId

    try {
        const { characterName, userPrompt, imageUrl, fileName } =  await newCharacter(streamerDatabaseId);
        const newChar = await createCharacterRecord(characterName, userPrompt, imageUrl, fileName)

        const subscriber = await db.Subscriber.findOne({
            where: {
                twitch_username: subscriberTwitchUsername
            }
        });

        const subscription = await db.StreamerSubscriber.findOne({
            where: {
                streamer_id: streamerDatabaseId,
                subscriber_id: subscriber.id
            }
        });

        await subscription.update({
            character_id: newChar.id
        });

        formattedData = {
            subscriberTwitchUsername,
            characterName,
            imageUrl,
            active: subscription.active
        }

        broadcastToStreamers(streamerDatabaseId, type, formattedData);

        res.status(200).json({
            success: true,
            message: "Character rerolled successfully"
        });

    } catch(err) {
        console.error(err, "Error re-rolling the character");
        res.status(500).json({ success: false, message: "Error rerolling the character", err})
    }
}

module.exports = reRollCharacter;