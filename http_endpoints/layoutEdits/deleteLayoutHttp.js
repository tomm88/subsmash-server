const deleteLayout = require('../../database/database_utilities/layouts/deleteLayout');

const deleteLayoutHttp = async (req, res) => {
    const { id } = req.params;
    const { streamerDatabaseId } = req.session;
    let deleteResponse;
    try {
        deleteResponse = await deleteLayout(id, streamerDatabaseId);
        res.status(200).json({ success: true, message: deleteResponse });
    } catch(error) {
        if (deleteResponse === 'Error: Layout is active'){
            res.status(403).json({ success: false, message: 'Layout is active'})
        }
        res.status(500).json({ success: false, message: 'Error deleting the layout', error });
        console.error("Error in http request for deleting layout")
    }
}

module.exports = deleteLayoutHttp;