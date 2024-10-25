const createNewLayout = require('../../database/database_utilities/layouts/createNewLayout');

const createNewLayoutHttp = async (req, res) => {
    const { streamerDatabaseId } = req.session;
    const { layoutName, layoutType, layoutData } = req.body;

    try {
        const newLayout = await createNewLayout(streamerDatabaseId, layoutName, layoutType, layoutData);
        res.status(200).json({ success: true, message: "Layout successfully created", newLayout })
    } catch (error) {
        res.status(500).json({ success: false, message: "Error in the http request to add layout to database" })
    }
}

module.exports = createNewLayoutHttp;