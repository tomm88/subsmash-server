const db = require('../../models');

const toggleActive = async (promptId, isActive, streamerDatabaseId) => {

    try {
        const streamer = await db.Streamer.findOne({
            where: {
                id: streamerDatabaseId
            }
        });

        const activePrompts = streamer.active_prompts
        const index = streamer.active_prompts.indexOf(promptId);

        if (isActive) {
            if (index === -1) {
                activePrompts.push(promptId);
            }
        } else {
            if (index > -1) {
                activePrompts.splice(index, 1);
            }
        }

        await db.Streamer.update(
            { active_prompts: activePrompts },
            { where: { id: streamerDatabaseId }}
        )

    } catch (error) {
        console.error("Error updating preset active status", error)
    }
}

module.exports = toggleActive;