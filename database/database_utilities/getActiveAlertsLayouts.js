const db = require('../models');

const getActiveAlertsLayouts = async (alertsHash) => {

    try {
        const streamer = await db.Streamer.findOne({
            where: {
                alerts_hash: alertsHash
            }
        });

        const alertIdsArray = streamer.active_alerts_layouts;
        const activeAlertLayouts = []
        for (id of alertIdsArray) {
            const layout = await db.Layout.findOne({
                where: {
                    id
                }
            });
            activeAlertLayouts.push(layout);
        }
        return activeAlertLayouts;

    } catch (error) {
        console.error('Error getting alerts layout', error)
    }
}

module.exports = getActiveAlertsLayouts