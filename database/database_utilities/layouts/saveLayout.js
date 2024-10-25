const db = require('../../models');

const saveLayout = async (layoutName, layoutData, id) => {
    try {
        await db.Layout.update({
            layout_name: layoutName,
            layout_data: layoutData
        }, 
        {
            where: {
                id
            }
        })
    } catch (error) {
        console.error('Error updating the layout', error)
    }
};

module.exports = saveLayout;