const db = require('../models');

const getActiveSlideshowLayout = async (slideshowHash) => {
    try {
        const streamer = await db.Streamer.findOne({
            where: {
                slideshow_hash: slideshowHash
            }
        })

        const slideshowLayout = await db.Layout.findOne({
            where: {
                id: streamer.active_slideshow_layout
            }
        })

        return slideshowLayout

    } catch (error) {
        console.error('Error getting active slideshow', error)
    }
}

module.exports = getActiveSlideshowLayout;