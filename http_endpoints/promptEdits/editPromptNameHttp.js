const editPromptName = require('../../database/database_utilities/prompts/editPromptName');

const editPromptNameHttp = async (req, res) => {
    const { newPromptName } = req.body;
    const { id } = req.params;

    try {
        await editPromptName(id, newPromptName);
        res.status(200).json({ success: true, message: 'prompt name updated successfully', newPromptName });
    } catch (error) {
        res.status(500).json({ success: false, message: 'error updating prompt name', error})
    }
}

module.exports = editPromptNameHttp;