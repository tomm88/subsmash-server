const db = require('../../models');

const editPromptName = async (promptId, newPromptName) => {
    try {
        await db.PromptData.update({
            prompt_name: newPromptName
        },
        {
            where: {
                id: promptId
            }
        })
        console.log('Prompt name updated successfully')
        return;
    } catch (error) {
        console.error('Error updating prompt name', error)
    }
}

module.exports = editPromptName;