const db = require('../models')

//Gets a streamer's slideshow hash and alerts hash from the database
//Called by front end dashboard for generating browser source urls
const getStreamerHashes = async (streamerTwitchId) => {
    try {
        const streamer = await db.Streamer.findOne({ 
            where: { 
                twitch_id: streamerTwitchId 
            } 
        });
        if (!streamer) {return "streamer not found"}
       return {
        slideshowHash: streamer.slideshow_hash,
        alertsHash: streamer.alerts_hash
       }

    } catch (error) {
        console.error('Error fetching alerts hash:', error);
    }
  };

  module.exports = getStreamerHashes;