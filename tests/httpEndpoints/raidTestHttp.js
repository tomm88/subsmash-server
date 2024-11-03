const handleRaid = require('../../eventHandlers/handleRaid')

const raidTestHttp = async (req, res) => {

    const { from_broadcaster_user_name, viewers } = req.body.payload;
    const { streamerDatabaseId } = req.body;

    const dummyPayload = {
        from_broadcaster_user_name,
        viewers
    };

    try {
        const response = await handleRaid(dummyPayload, streamerDatabaseId);
        res.status(200).json(response);
    } catch (error) {
        console.error('Error triggering handleRaid: ', error)
        res.status(500).json(error)
    }

    
};

module.exports = raidTestHttp;