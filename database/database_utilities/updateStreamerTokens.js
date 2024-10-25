const db = require('../models');

//Updates database with new access and refresh tokens for given streamer 
//or creates a record in "streamer_tokens" table if new user
const updateStreamerTokens = async (streamerDatabaseId, accessToken, refreshToken) => {

    try {
        const [tokens, created] = await db.StreamerToken.findOrCreate({
            where: {streamer_id: streamerDatabaseId},
            defaults: {
                access_token: accessToken,
                refresh_token: refreshToken
            }
        });
        
        if(!created){
            await tokens.update({
                access_token: accessToken,
                refresh_token: refreshToken
            })
        }

    } catch(error) {
        console.error(error, "couldn't update database with new tokens");
    }

}

module.exports = updateStreamerTokens;