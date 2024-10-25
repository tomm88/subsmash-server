const getAllUsers = require('../database/database_utilities/getAllUsers');

const getAllUsersHttp = async (req, res) => {
    try {
        const streamers = await getAllUsers();
        res.status(200).json({ success: true, streamers })
    } catch(error) {
        res.status(500).json({ success: false, message: 'Failed to get all users', error})
    }
}

module.exports = getAllUsersHttp;