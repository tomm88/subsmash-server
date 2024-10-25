const db = require('../../models');

const updateActiveStatus = async (layoutId, layoutType, newStatus, streamerDatabaseId) => {
    try {
        const streamer = await db.Streamer.findOne({
            where: {
                id: streamerDatabaseId
            }
        });

        if (newStatus === true) {
            if (layoutType === 'slideshow') {
                await streamer.update({
                    active_slideshow_layout: layoutId
                });
                return;
            }
    
            if (layoutType === 'alerts') {
                let layouts = streamer.active_alerts_layouts;
                layouts.push(parseInt(layoutId));
                await db.Streamer.update({
                    active_alerts_layouts: layouts
                }, {
                    where: {
                        id: streamerDatabaseId
                    }
                });
                return;
            }    
        }   

        if (newStatus === false) {
            if (layoutType === 'slideshow') {
                await streamer.update({
                    active_slideshow_layout: null
                });
                return;
            }

            if (layoutType === 'alerts') {
                let layouts = streamer.active_alerts_layouts.filter(layout => layout !== parseInt(layoutId));
                await streamer.update({
                    active_alerts_layouts: layouts
                });
                return;
            }    
        }
        return;
    } catch (error) {
        console.error('Error updating active status', error);
    }
}

module.exports = updateActiveStatus;