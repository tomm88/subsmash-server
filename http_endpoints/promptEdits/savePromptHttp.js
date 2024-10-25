const savePrompt = require('../../database/database_utilities/prompts/savePrompt');

const savePromptHttp = async (req, res) => {
    const { prompt_name, prompt_data } = req.body;
    const { id } = req.params;
    
    try {
        await savePrompt(prompt_name, prompt_data, id);
        res.status(200).json({ success: true, message: "Prompt saved"})
    } catch (error) {
        res.status(500).json({success: false, message: "Error saving prompt", error})
    }
}

module.exports = savePromptHttp;