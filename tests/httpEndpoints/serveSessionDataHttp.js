const serveSessionDataHttp = (req, res) => {
    const streamerDatabaseId = req.session.streamerDatabaseId;
    const streamerTwitchId = req.session.twitchId;
    const streamerUsername = req.session.twitchUsername;

    const data = {
        streamerDatabaseId,
        streamerTwitchId,
        streamerUsername
    }
    
    res.status(200).json(data);
};

module.exports = serveSessionDataHttp;