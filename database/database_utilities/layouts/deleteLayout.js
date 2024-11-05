const db = require('../../models');

const deleteLayout = async (layoutId, streamerDatabaseId) => {
    try {

        const streamer = await db.Streamer.findOne({
            where: {
                id: streamerDatabaseId
            }
        });
        const idInt = parseInt(layoutId);
        if (idInt === streamer.active_slideshow_layout || streamer.active_alerts_layouts.includes(idInt)) {
            return "Error: Layout is active"
        }
        await db.Layout.destroy({
            where: {
                id: layoutId
            }
        })
        return 'successfully deleted layout';
    } catch (error) {
        console.error('Error deleting layout', error);
    }
}

module.exports = deleteLayout;