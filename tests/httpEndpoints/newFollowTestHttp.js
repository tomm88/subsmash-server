const handleFollow = require('../../eventHandlers/handleFollow')

const newFollowerTestHttp = async (req, res) => {

    const { followerTwitchUsername } = req.body.payload;
    const { streamerDatabaseId } = req.body

    const dummyPayload = {
        user_name: followerTwitchUsername
    };

    try {
        const response = await handleFollow(dummyPayload, streamerDatabaseId);
        res.status(200).json(response);
    } catch (error) {
        console.error('Error triggering handleFollow: ', error)
        res.status(500).json(error)
    }

    
};

module.exports = newFollowerTestHttp;