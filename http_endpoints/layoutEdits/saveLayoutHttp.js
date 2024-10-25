const saveLayout = require('../../database/database_utilities/layouts/saveLayout');

const saveLayoutHttp = async (req, res) => {
    const { layout_name, layout_data } = req.body;
    const { id } = req.params;

    try {
        await saveLayout(layout_name, layout_data, id);
        res.status(200).json({ success: true, message: 'Layout saved successfully'})
    } catch(error) {
        res.status(500).json({ success: false, message: 'Error updating the layout', error})
    }
}

module.exports = saveLayoutHttp;