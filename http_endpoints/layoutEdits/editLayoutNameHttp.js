const editLayoutName = require('../../database/database_utilities/layouts/editLayoutName');

const editLayoutNameHttp = async (req, res) => {
    const { newLayoutName } = req.body;
    const { id } = req.params
    try {
        await editLayoutName(newLayoutName, id);
        res.status(200).json({ success: true, message: 'Layout name updated successfully', newLayoutName })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating layout name', error})
    }

}

module.exports = editLayoutNameHttp;