const { Op } = require('sequelize')
const db = require('../../models');

const getStreamerPromptsWithPresets = async (streamerDatabaseId) => {
    try {
        const prompts = await db.PromptData.findAll({
            where: {
                [Op.or]: [
                    { streamer_id: streamerDatabaseId },
                    { streamer_id: 1 }
                ]
            }
        });

        const streamer = await db.Streamer.findOne({
            where: {
                id: streamerDatabaseId
            }
        });

        const activePrompts = streamer.active_prompts;

        const updatedPrompts = prompts.map(prompt => {
            prompt.dataValues.active = activePrompts.includes(prompt.id);

            prompt.prompt_data = prompt.prompt_data.sort((a, b) => a.sortIndex - b.sortIndex)

            return prompt;
        });

        return updatedPrompts;
    } catch(error) {
        console.error("Error getting prompts", error)
    }
}

module.exports = getStreamerPromptsWithPresets;