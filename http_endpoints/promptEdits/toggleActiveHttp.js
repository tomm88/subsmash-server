const toggleActive = require('../../database/database_utilities/prompts/toggleActive');

const toggleActiveHttp = async (req, res) => {
    const { id } = req.params;
    const { isActive } = req.body;
    const { streamerDatabaseId } = req.session;
    const promptId = parseInt(id);

    try {
        await toggleActive(promptId, isActive, streamerDatabaseId);
        res.status(200).json({ success: true, message: "Active status updated" })
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updated active status" })
    }
    
}

module.exports = toggleActiveHttp;