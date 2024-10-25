const getStreamerTwitchDataHttp = async (req, res) => {
    res.status(200).json({
        profilePicUrl: req.session.profilePicUrl,
        streamerTwitchUsername: req.session.twitchUsername,
        isAdmin: req.session.isAdmin
    })
}

module.exports = getStreamerTwitchDataHttp;