const getSubsFromTwitch  = require('../controllers/twitchApiControllers/getSubsFromTwitch');

const getSubsFromTwitchHttpSlideshow = async (req, res) => {
    try {
        const response = await getSubsFromTwitch(req.query.hash)
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Failed to get subs from Twitch", error})
    }

};

module.exports = getSubsFromTwitchHttpSlideshow;