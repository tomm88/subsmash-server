const getStreamerLayoutsWithPresets = require('../database/database_utilities/layouts/getStreamerLayoutsWithPresets');

const getStreamerLayoutsWithPresetsHttp = async (req, res) => {
    const { streamerDatabaseId } = req.session;

    try{
        const streamerLayouts = await getStreamerLayoutsWithPresets(streamerDatabaseId);
        res.status(200).json({
            success: true, 
            layouts: streamerLayouts.layouts, 
            activeSlideshowLayout: streamerLayouts.activeSlideshowLayout,
            activeAlertsLayouts: streamerLayouts.activeAlertsLayouts
        })
    } catch(error) {
        console.error('Error fetching layouts', error)
        res.status(500).json({success: false, error})
    }
}

module.exports = getStreamerLayoutsWithPresetsHttp;