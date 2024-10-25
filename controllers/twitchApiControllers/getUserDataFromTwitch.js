const config = require('../../config/config');
const axios = require('axios')

const getUserDataFromTwitch = async (accessToken) => {
    try {
        const response = await axios.get('https://api.twitch.tv/helix/users', {
            headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Client-Id': config.TWITCH_CLIENT_ID
            }
        });

        return response.data
    } catch(error) {
        console.error(error, "couldn't get user from Twitch")
    }
}

module.exports = getUserDataFromTwitch