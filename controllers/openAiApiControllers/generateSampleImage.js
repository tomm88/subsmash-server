const OpenAI = require('openai');
const generateName = require('../openAiApiControllers/generateCharacterName');
const enhancePrompt = require('./enhancePrompt');

const openai = new OpenAI();

const generateSampleImage = async (prompt) => {

    try {

        const enhancedPrompt = await enhancePrompt(prompt);

        console.log('in generateSampleImage. Enhanced Prompt is: ', enhancedPrompt)

        const image = await openai.images.generate({ 
            model: "dall-e-3",
            prompt: enhancedPrompt,
            n: 1,
            size: "1024x1024",
            quality: "standard" 
        });

        const imageUrl = image.data[0].url;

        const characterName = await generateName(image.data[0].revised_prompt);

        const sampleImage = {
            imageUrl,
            characterName
        }

        return sampleImage;
        
    } catch (error) {
        console.error("Error generating sample image", error)
        return error;
    }

}

module.exports = generateSampleImage;