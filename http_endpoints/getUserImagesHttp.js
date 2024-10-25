const getUserImages = require('../controllers/awsControllers/getUserImages');

const getUserImagesHttp = async (req, res) => {
    const { twitchUsername } = req.session;

    try {
        const images = await getUserImages(twitchUsername);
        res.status(200).json({success: true, message: 'Successfully fetched images from S3', images})
    } catch (error) {
        res.status(500).json({success: false, message: 'Error getting user images from S3', error})
    }
    

}

module.exports = getUserImagesHttp;