const deleteUserImage = require('../controllers/awsControllers/deleteUserImage');

const deleteUserImageHttp = async (req, res) => {
    const { twitchUsername } = req.session;
    const { imageTitle } = req.params;

    try {
        const response = await deleteUserImage(twitchUsername, imageTitle);
        res.status(200).json({ success: true, message: 'Image deleted successfully', response });
    } catch (error) {
        console.error('Error deleteing the file', error);
        res.status(500).json({ success: false, message: 'Error deleting the file', error });
    }
}

module.exports = deleteUserImageHttp;