const db = require('../models');

const getAllUsers = async () => {
    try {
        const streamers = await db.Streamer.findAll();
        const filteredStreamers = streamers.filter(st => st.id !== 1)
        return filteredStreamers
    } catch (error) {
        console.error('Failed to get users', error)
    }
}

module.exports = getAllUsers;