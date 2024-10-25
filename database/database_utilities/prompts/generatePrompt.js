const getActivePrompts = require('./getActivePrompts');
const randomChoice = require('../../../utils/randomChoice');
const enhancePrompt = require('../../../controllers/openAiApiControllers/enhancePrompt');

const generatePrompt = async (streamerDatabaseId) => {
    try {
        const activePrompts = await getActivePrompts(streamerDatabaseId);

        const promptConfig = randomChoice(activePrompts);

        let userPrompt = '';

        const sortedPromptData = promptConfig.prompt_data.sort((a, b) => a.sortIndex - b.sortIndex);

        for (let item of sortedPromptData) {
            if (item.type === 'static') {
                userPrompt += item.value, ' ';
                userPrompt += ' ';
            }
            if (item.type === 'random') {
                userPrompt += randomChoice(item.value); 
                userPrompt += ' ';
            }
        }

        const enhancedPrompt = await enhancePrompt(userPrompt);

        return {userPrompt, enhancedPrompt};


    } catch (error) {
        console.error('Error generating prompt', error);
    }
}

module.exports = generatePrompt;