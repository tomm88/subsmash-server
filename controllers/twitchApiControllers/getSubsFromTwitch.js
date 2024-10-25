const config = require('../../config/config');
const axios = require('axios');
const updateDatabaseSubscribers = require('../../database/database_utilities/updateSubscribers');
const getTokensFromDatabase = require('../../database/database_utilities/getTokensFromDatabase');

//A function to update the list of a streamer's active subscribers
const getSubsFromTwitch = async (hash) => {

    try {
        //Get the streamer's IDs and access/refresh tokens for the Twitch API 
        const tokens = await getTokensFromDatabase(hash);       

        //Calls the Twitch API to get a full list of the streamer's subscribers
        const response = await axios.get('https://api.twitch.tv/helix/subscriptions', {
            params: {
                broadcaster_id: tokens.streamerTwitchId
            },
            headers: {
                'Authorization': `Bearer ${tokens.accessToken}`,
                'Client-Id': config.TWITCH_CLIENT_ID
            }
        });

        const subs = response.data.data;

        //Updates the database with the newest subscriber data from Twitch for this streamer, then returns an array containing the details of active subscribers.
        const databaseSubs = await updateDatabaseSubscribers(subs, tokens.streamerTwitchId, tokens.streamerDatabaseId, hash);
        return databaseSubs;

    } catch(error) {        
        console.error(error, "Couldn't get subscribers from Twitch");
    }
};

module.exports = getSubsFromTwitch;