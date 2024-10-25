const deleteLayout = require('../../database/database_utilities/layouts/deleteLayout');

const deleteLayoutHttp = async (req, res) => {
    const { id } = req.params;

    try {
        await deleteLayout(id);
        res.status(200).json({ success: true, message: 'Layout deleted' });
    } catch(error) {
        res.status(500).json({ success: false, message: 'Error deleting the layout', error })
    }
}

module.exports = deleteLayoutHttp;