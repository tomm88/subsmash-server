const getStreamerPromptsWithPresets = require('../database/database_utilities/prompts/getStreamerPromptsWithPresets');

const getStreamerPromptsWithPresetsHttp = async (req, res) => {
    const response = await getStreamerPromptsWithPresets(req.session.streamerDatabaseId);
    res.status(200).json(response);
}

module.exports = getStreamerPromptsWithPresetsHttp;