const getTokensFromDatabase = require('../database/database_utilities/getTokensFromDatabase')

const getTokensFromDatabaseHttp = async (req, res) => {
    const { hash } = req.body;

    try {
        const tokens = getTokensFromDatabase(hash);
        res.status(200).json(tokens)
    } catch(err) {
        res.status(500).json({error: err.message})
    }
};

module.exports = getTokensFromDatabaseHttp;