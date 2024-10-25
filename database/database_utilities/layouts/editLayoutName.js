const db = require('../../models');

const editLayoutName = async (newLayoutName, id) => {
    try {
        await db.Layout.update({
            layout_name: newLayoutName
        }, 
        {
            where: {
                id
            }
        })
        return;
    } catch (error) {
        console.error('Error updating layout name', error)
    }
}

module.exports = editLayoutName;