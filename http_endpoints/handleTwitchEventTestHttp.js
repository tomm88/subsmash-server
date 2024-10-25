const handleTwitchEventTest = require('../eventHandlers/handleTwitchEventTest');

const handleTwitchEventTestHttp = async (req, res) => {
    const { testData } = req.body;
    const { streamerDatabaseId } = req.session;

    try {
        await handleTwitchEventTest(testData, streamerDatabaseId);
        res.status(200).json({ success: true, message: 'Successfully tested Twitch event'})
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error testing Twitch event', error})
    }

};

module.exports = handleTwitchEventTestHttp;