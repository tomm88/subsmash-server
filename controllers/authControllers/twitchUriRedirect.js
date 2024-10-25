const generateState = require('../../utils/generateState');
const config = require('../../config/config');

const twitchUriRedirect = (req, res) => {
    //Generate a random state value and store it in the session
    const state = generateState(16);
    req.session.state = state;

    //Redirect the user to the Twitch authorization URL
    const authUrl = `${config.TWITCH_OAUTH_URL}?client_id=${config.TWITCH_CLIENT_ID}&redirect_uri=${config.TWITCH_REDIRECT_URI}&response_type=code&scope=channel%3Aread%3Asubscriptions%20moderator%3Aread%3Afollowers&state=${state}`;
    res.redirect(authUrl);
};

module.exports = twitchUriRedirect;