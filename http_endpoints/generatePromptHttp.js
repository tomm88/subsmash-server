const generatePrompt = require('../database/database_utilities/prompts/generatePrompt');
const getStreamerFromHash = require('../database/database_utilities/getStreamerFromHash');

const generatePromptHttp = async (req, res) => {
    const { hash } = req.body;
    try {
        const streamer = await getStreamerFromHash(hash);

        await generatePrompt(streamer.id)
    } catch(error) {
        console.error('Error in http request for generating prompt', error)
    }
}

module.exports = generatePromptHttp;