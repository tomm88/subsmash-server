const db = require('../../models');

const savePrompt = async (promptName, promptData, id) => {
    try {
        await db.PromptData.update({
            prompt_name: promptName,
            prompt_data: promptData
        },
        {
            where: {
                id
            }
        });
    } catch (error) {
        console.error ("Error saving prompt to database", error);
    }
}

module.exports = savePrompt;