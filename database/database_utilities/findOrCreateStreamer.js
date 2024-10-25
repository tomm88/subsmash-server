const crypto = require('crypto')
const db = require('../models')

const findOrCreateStreamer = async (twitchId, twitchUsername) => {
    const newSlideshowHash = crypto.randomBytes(16).toString('hex');
    const newAlertsHash = crypto.randomBytes(16).toString('hex');

    try{
        const [streamer, created] = await db.Streamer.findOrCreate({
            where: { twitch_id: twitchId },
            defaults: {
                twitch_username: twitchUsername,
                slideshow_hash: newSlideshowHash,
                alerts_hash: newAlertsHash,
                is_approved: false,
                is_admin: false,
                active_prompts: [1],
                active_slideshow_layout: 4,
                active_alerts_layouts: [1]
            }
        });

        if (!streamer.is_approved) return false;

        return streamer.dataValues
    } catch(error) {
        console.error(error, "error accessing database")
    }
}

module.exports = findOrCreateStreamer;

