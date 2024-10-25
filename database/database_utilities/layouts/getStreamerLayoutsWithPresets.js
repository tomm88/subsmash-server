const { Op } = require('sequelize')
const db = require('../../models');

const getStreamerLayoutsWithPresets = async (streamerDatabaseId) => {
    try {
        const layouts = await db.Layout.findAll({
            where: {
                [Op.or]: [
                    { streamer_id: streamerDatabaseId },
                    { streamer_id: 1 }
                ]
            }
        })

        const sortedLayouts = layouts.map(layout => {
            layout.layout_data = layout.layout_data.sort((a, b) => b.zIndex - a.zIndex);
            return layout;
        })

        const streamer = await db.Streamer.findOne({
            where: {
                id: streamerDatabaseId
            }
        })

        return {
            layouts: sortedLayouts,
            activeSlideshowLayout: streamer.active_slideshow_layout,
            activeAlertsLayouts: streamer.active_alerts_layouts
        };

    } catch(error) {
        console.error('Error fetching layouts from database', error)
    }
}

module.exports = getStreamerLayoutsWithPresets;