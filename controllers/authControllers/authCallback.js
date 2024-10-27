const config = require('../../config/config');
const getTokensFromTwitch = require('../twitchApiControllers/getTokensFromTwitch')
const getUserDataFromTwitch = require('../twitchApiControllers/getUserDataFromTwitch')
const findOrCreateStreamer = require('../../database/database_utilities/findOrCreateStreamer')
const updateStreamerTokens = require('../../database/database_utilities/updateStreamerTokens')

const authCallback = async (req, res) => {

    //Saves the code and state parameters from the uri to use in requests and authentication
    const code = req.query.code;
    const returnedState = req.query.state;

    console.log("saved from req.query.state is: ", returnedState)
    console.log("req.session is: ", req.session)

    //Checks that the returned state matches the one saved in session data for authentication
    if (returnedState !== req.session.state) {
       return res.status(403).send('Invalid state');
    }

    try {
        //Fetches an access token and refresh token for the user, and saves them in the session data
        const tokensResponse = await getTokensFromTwitch(code);
        const accessToken = tokensResponse.access_token;
        const refreshToken = tokensResponse.refresh_token
        req.session.accessToken = accessToken;
        req.session.refreshToken = refreshToken;

        //Uses the access token to get information about the user - their Twitch username and their Twitch Id - saves them to session data
        const userResponse = await getUserDataFromTwitch(accessToken);
        const twitchId = userResponse.data[0].id;
        const twitchUsername = userResponse.data[0].display_name;
        const profilePicUrl = userResponse.data[0].profile_image_url;
        req.session.twitchId = twitchId;
        req.session.twitchUsername = twitchUsername;
        req.session.profilePicUrl = profilePicUrl;

        //Ensure the user exists as a Streamer in the database, gets their database Id and stores it, along with the hashes for their slideshow and alerts box, in the session data
        const streamerDatabaseResponse = await findOrCreateStreamer(twitchId, twitchUsername);
        if (!streamerDatabaseResponse) {
            res.redirect(`${config.FRONTEND_URL}/coming_soon`)
            return;
        }
        const streamerDatabaseId = streamerDatabaseResponse.id;
        const slideshowHash = streamerDatabaseResponse.slideshow_hash;
        const alertsHash = streamerDatabaseResponse.alerts_hash;
        const isAdmin = streamerDatabaseResponse.is_admin;
        req.session.streamerDatabaseId = streamerDatabaseId;
        req.session.slideshowHash = slideshowHash;
        req.session.alertsHash = alertsHash;
        req.session.isAdmin = isAdmin;



        //Update the streamers stored tokens in the database
        await updateStreamerTokens(streamerDatabaseId, accessToken, refreshToken);

        res.redirect(`${config.FRONTEND_URL}/dashboard`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Auth error');
    }
};

module.exports = authCallback;