const handleCheer = require('../../eventHandlers/handleCheer')

const cheerTestHttp = async (req, res) => {

    const { user_name, message, bits } = req.body.payload;
    const { streamerDatabaseId } = req.body

    const dummyPayload = {
        user_name,
        message,
        bits
    };

    try {
        const response = await handleCheer(dummyPayload, streamerDatabaseId);
        res.status(200).json(response);
    } catch (error) {
        console.error('Error triggering handleCheer: ', error)
        res.status(500).json(error)
    }

    
};

module.exports = cheerTestHttp;