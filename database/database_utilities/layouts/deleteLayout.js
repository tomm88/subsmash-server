const db = require('../../models');

const deleteLayout = async (layoutId) => {
    try {
        await db.Layout.destroy({
            where: {
                id: layoutId
            }
        })
        return;
    } catch (error) {
        console.error('Error deleting layout', error)
    }
}

module.exports = deleteLayout;