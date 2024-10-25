const db = require('../models');
const refreshAccessToken = require('../../controllers/twitchApiControllers/refreshAccessToken');
const getStreamerFromHash = require('./getStreamerFromHash')
const config = require('../../config/config');
const axios = require('axios');

//Function to retrieve Twitch access and refresh tokens from the database for a streamer.
//Performs a test call to Twitch API using tokens to verify they're still valid.
//Refreshes tokens if not.
const getTokensFromDatabase = async (hash) => {

    let accessToken;
    let refreshToken;
    let streamerTwitchId;
    let streamerDatabaseId;

    try{
        //Get streamer from database
        const streamer = await getStreamerFromHash(hash);

        //Get their access tokens from database
        const tokens = await db.StreamerToken.findOne({
            where: {
                streamer_id: streamer.id
            }
        });

        accessToken = tokens.access_token;
        refreshToken = tokens.refresh_token;
        streamerTwitchId = streamer.twitch_id;
        streamerDatabaseId = streamer.id;

    //Perform test call to Twitch API to verify token validity
    try{
        await axios.get('https://api.twitch.tv/helix/users', {
            headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Client-Id': config.TWITCH_CLIENT_ID
            }
        });

        return {
            accessToken,
            refreshToken,
            streamerTwitchId,
            streamerDatabaseId
        }

    } catch(error) {
        //If response from Twitch says access token has expired, refresh it using the refresh token from database
        if (error.response && error.response.status === 401){
            console.log("Access token has expired, refreshing...");
            try {
            const newTokens = await refreshAccessToken(refreshToken);
            return {
                accessToken: newTokens.access_token,
                refreshToken: newTokens.refresh_token,
                streamerTwitchId,
                streamerDatabaseId
            }
            } catch (refreshError) {
                console.error("Could not refresh access token", refreshError);
                
            }
        }
        console.error("Token test failed for reason other than invalid OAuth token", error);
    }

    } catch(error) {
        if (error.response.status !== 401) {
            console.error("Error getting access tokens from database")
        }
    }
}

module.exports = getTokensFromDatabase;