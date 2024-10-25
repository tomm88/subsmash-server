const getStreamerPromptsWithPresets = require('./getStreamerPromptsWithPresets')


const getActivePrompts = async (streamerDatabaseId) => {
    try {
        const allPrompts = await getStreamerPromptsWithPresets(streamerDatabaseId);
        console.log('In getActivePrompt. allPrompts are: ', allPrompts)

        const activePrompts = allPrompts.filter(prompt => prompt.dataValues.active)
        console.log('in getActivePrompts. activePrompts after filtering are:', activePrompts)

        if (activePrompts.length > 0) {
            return activePrompts;
        }

        const defaultPrompt = allPrompts.find((prompt) => prompt.id === 1);
        return [defaultPrompt]

    } catch (error) {
        console.error("Error getting active prompts", error)
    }
}

module.exports = getActivePrompts;