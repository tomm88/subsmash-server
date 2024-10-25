const updateActiveStatus = require('../../database/database_utilities/layouts/updateActiveStatus');

const updateActiveStatusHttp = async (req, res) => {
    const { id } = req.params;
    const { layoutType, newStatus } = req.body;
    const { streamerDatabaseId } = req.session;

    try {
        await updateActiveStatus(id, layoutType, newStatus, streamerDatabaseId);
        res.status(200).json({ success: true, message: 'active status successfully updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'error updating active status', error});
    }
}
module.exports = updateActiveStatusHttp;