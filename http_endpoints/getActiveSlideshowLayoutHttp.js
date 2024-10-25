const getActiveSlideshowLayout = require('../database/database_utilities/getActiveSlideshowLayout');

const getActiveSlideshowLayoutHttp = async (req, res) => {
    const {slideshowHash} = req.params;

    try {   
        const slideshowLayout = await getActiveSlideshowLayout(slideshowHash);
        res.status(200).json({ success: true, slideshowLayout })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error getting slideshow layout', error})
    }
};

module.exports = getActiveSlideshowLayoutHttp;