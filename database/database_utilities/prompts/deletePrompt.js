const db = require('../../models');

const deletePrompt = async (promptId) => {
    try {
        await db.PromptData.destroy({
            where: {
                id: promptId
            }
        })
    } catch (error) {
        console.error("Error deleting prompt", error)
    }
}

module.exports = deletePrompt;