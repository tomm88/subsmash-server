const getSubscribersFromDatabase = require('../database/database_utilities/getSubscribersFromDatabase');

const getSubsFromDatabaseHttp = async (req, res) => {
    const { slideshowHash } = req.session;
    try {
        const subs = await getSubscribersFromDatabase(slideshowHash);
        res.status(200).json({ success: true, subs })
    } catch (error) {
        console.error('Error fetching subscribers from databse', error)
    }
}

module.exports = getSubsFromDatabaseHttp;