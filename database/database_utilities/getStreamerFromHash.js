const { Op } = require('sequelize');
const db = require('../models');

//Function for getting a streamer from the database using only either their slideshow hash or alerts hash
const getStreamerFromHash = async (hash) => {
    try {
        const streamer = await db.Streamer.findOne({
            where: {
                [Op.or]: [
                    { slideshow_hash: hash },
                    { alerts_hash: hash }
                ]
            }
        });
        return streamer;
    } catch (error) {
        console.error('Failed to get streamer from database: ', error)
    }
};

module.exports = getStreamerFromHash

