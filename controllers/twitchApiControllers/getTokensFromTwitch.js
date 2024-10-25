const config = require('../../config/config')
const axios = require('axios')

//Uses the code returned in the auth url to get access and refresh tokens from Twitch
const getTokensFromTwitch = async (code) => {
    try {
        const response = await axios.post(`${config.TWITCH_TOKEN_URL}`, null, {
          params: {
            client_id: config.TWITCH_CLIENT_ID,
            client_secret: config.TWITCH_CLIENT_SECRET,
            code,
            grant_type: 'authorization_code',
            redirect_uri: config.TWITCH_REDIRECT_URI,
          },
        })
        return response.data;
    } catch (error) {
        console.error(error, "couldn't get tokens")
        }
}

module.exports = getTokensFromTwitch;