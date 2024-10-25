const getActiveAlertsLayouts = require('../database/database_utilities/getActiveAlertsLayouts');

const getActiveAlertsLayoutsHttp = async (req, res) => {
    const { alertsHash } = req.params;
    try {
        const alertsLayouts = await getActiveAlertsLayouts(alertsHash);
        res.status(200).json({ success: true, alertsLayouts })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error getting alerts layouts', error})
    }

}

module.exports = getActiveAlertsLayoutsHttp;