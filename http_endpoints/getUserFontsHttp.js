const fetchUserFonts = require('../controllers/awsControllers/fetchUserFonts');

const getUserFontsHttp = async (req, res) => {
    const { twitchUsername } = req.session
    try {
        const fonts = await fetchUserFonts(twitchUsername);
        res.status(200).json({ success: true, fonts})
    } catch(error) {
        res.status(500).json({ success: false, error})
    }
}

module.exports = getUserFontsHttp;