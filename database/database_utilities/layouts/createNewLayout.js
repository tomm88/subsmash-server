const db = require('../../models');

const createNewLayout = async (streamerDatabaseId, layoutName, layoutType, layoutData) => {
    try {
        const newLayout = await db.Layout.create({
            streamer_id: streamerDatabaseId,
            layout_name: layoutName,
            layout_type: layoutType,
            layout_data: layoutData
        })
        return newLayout
    } catch (error) {
        console.error('Error creating the new layout in the database', error)
    }
}

module.exports = createNewLayout;