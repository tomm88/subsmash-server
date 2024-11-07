const deleteUserSound = require('../controllers/awsControllers/deleteUserSound');

const deleteUserSoundHttp = async (req, res) => {
    const { twitchUsername } = req.session;
    const { soundTitle } = req.params;

    try {
        const response = await deleteUserSound(twitchUsername, soundTitle);
        res.status(200).json({ success: true, message: 'Sound deleted successfully', response });
    } catch (error) {
        console.error('Error deleteing the file', error);
        res.status(500).json({ success: false, message: 'Error deleting the file', error });
    }
}

module.exports = deleteUserSoundHttp;