const axios = require('axios');
const config = require('../../config/config')
const db = require('../../database/models')
const updateStreamerTokens = require('../../database/database_utilities/updateStreamerTokens')

//Function for refreshing a streamer's Twitch access token. Called if Twitch returns a 401 response from a request that uses an access token
const refreshAccessToken = async (refreshToken) => {

    try{
        //Find the streamer in the database from their refresh token
        const streamer = await db.StreamerToken.findOne({
            where: {
                refresh_token: refreshToken
            }
        });

        //Call Twitch's token end point witht the refresh token grant type and the token itelf
        const refreshTokens = await axios.post(config.TWITCH_TOKEN_URL, {
                client_id: config.TWITCH_CLIENT_ID,
                client_secret: config.TWITCH_CLIENT_SECRET,
                grant_type: 'refresh_token',
                refresh_token: refreshToken
        });

        //Update the database with the streamer's new access and refresh tokens
        await updateStreamerTokens(streamer.streamer_id, refreshTokens.data.access_token, refreshTokens.data.refresh_token)

        console.log("Refresh token data:", refreshTokens.data)
        
        return refreshTokens.data
    } catch(err) {
        console.error("Could not refresh access token", err.response.data)
        return 'invalid'
    }    
};

module.exports = refreshAccessToken;