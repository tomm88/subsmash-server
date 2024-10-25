const getStreamerHashes = require('../database/database_utilities/getStreamerHashes')

const getStreamerHashesHttp = async (req, res) => {
    try {
        const response = await getStreamerHashes(req.session.twitchId)
        if(response === "streamer not found") {res.status(404).json({message: "streamer not found"})}
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching alerts hash:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  };

  module.exports = getStreamerHashesHttp;