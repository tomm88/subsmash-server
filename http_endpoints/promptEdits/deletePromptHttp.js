const deletePrompt = require('../../database/database_utilities/prompts/deletePrompt');

const deletePromptHttp = async (req, res) => {
    const { promptId } = req.body;

    try {
        await deletePrompt(promptId);
        res.status(200).json({ success: true, message: "Successfully deleted prompt" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error in the http request to delete prompt" });
    }
}

module.exports = deletePromptHttp;