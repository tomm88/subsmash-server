const getUserSounds = require('../controllers/awsControllers/getUserSounds');

const getUserSoundsHttp = async (req, res) => {
    const { twitchUsername } = req.session
    try {
        const sounds = await getUserSounds(twitchUsername);
        res.status(200).json({ success: true, sounds})
    } catch(error) {
        res.status(500).json({ success: false, error})
    }
}

module.exports = getUserSoundsHttp;