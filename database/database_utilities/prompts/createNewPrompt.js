const db = require('../../models');

const createNewPrompt = async (streamerDatabaseId, promptName, promptData) => {
    try {
        const newPrompt = await db.PromptData.create({
            streamer_id: streamerDatabaseId,
            prompt_name: promptName,
            prompt_data: promptData,
            active: false
        });
        return newPrompt
    } catch (error) {
        console.error("Error adding prompt to database", error)
    }
}

module.exports = createNewPrompt;