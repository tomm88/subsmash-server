const createNewPrompt = require('../../database/database_utilities/prompts/createNewPrompt');

const createNewPromptHttp = async (req, res) => {
    const { streamerDatabaseId } = req.session;
    const { promptName, promptData } = req.body;

    try {
        const newPrompt = await createNewPrompt(streamerDatabaseId, promptName, promptData);
        res.status(200).json({ success: true, message: "Prompt successfully created", newPrompt })
    } catch (error) {
        res.status(500).json({ success: false, message: "Error in the http request to add prompt to database" })
    }
}

module.exports = createNewPromptHttp;