const OpenAI = require('openai');
const axios = require('axios');
const crypto = require('crypto')
const db = require('../../database/models');
const prompt = require('../../database/database_utilities/prompts/generatePrompt');
const generateName = require('../openAiApiControllers/generateCharacterName');
const uploadCharacterImagetoS3 = require('../awsControllers/uploadCharacterImagetoS3');

const openai = new OpenAI();

const newCharacter = async (streamerDatabaseId) => {
    try {

        const streamer = await db.Streamer.findOne({
            attributes: ['twitch_username'],
            where: { id: streamerDatabaseId }
        });

        //Generate a new prompt with random parameters
        const {userPrompt, enhancedPrompt} = await prompt(streamerDatabaseId);
        console.log('In generateNewCharacter - enhanced prompt is: ', enhancedPrompt)

        //Call dall-e-3 to generate the image
        const image = await openai.images.generate({ 
            model: "dall-e-3",
            prompt: enhancedPrompt,
            n: 1,
            size: "1024x1024",
            quality: "standard" 
        });

        const imgUrl = image.data[0].url;
        const downloadImage = await axios.get(imgUrl, { responseType: 'stream' });
        // const imageFile = Buffer.from(downloadImage.data, 'binary');

        //Calls gpt-4o-mini to generate a name based on the character traits described in the prompt
        const characterName = await generateName(enhancedPrompt);

        //Generates a file name for the new images and downloads it to the images folder
        const fileName = characterName + "___" + crypto.randomBytes(10).toString("hex") + ".png";

        const imageUrl = await uploadCharacterImagetoS3(streamer.twitch_username, fileName, downloadImage.data);
        
        const newCharacter = {
            characterName,
            userPrompt,
            imageUrl,
            fileName
        }

        return newCharacter;
    } catch(error) {
        console.error("Error generating the character", error)
    }
}

module.exports = newCharacter;