const axios = require('axios');
const refreshAccessToken = require('./refreshAccessToken')

const validateToken = async (accessToken, refreshToken) => {
    console.log("The access token passed to validateToken is: ", accessToken)
    try {
        const response = await axios.get('https://id.twitch.tv/oauth2/validate', {
            headers: {
                'Authorization': `OAuth ${accessToken}`
            }
        });
        console.log("the response from the validate request is: ", response.status)
        return 'valid'
    } catch (error) {
        if (error.response && error.response.status === 401){
            console.log("Access token has expired, refreshing...");
            try {
                const newTokens = await refreshAccessToken(refreshToken);
                if (newTokens === 'invalid') return 'invalid';
                return {
                    accessToken: newTokens.access_token,
                    refreshToken: newTokens.refresh_token,
                }
            } catch (refreshError) {
                console.error("Could not refresh access token", refreshError);
                if (refreshError.response && refreshError.response.status === 401) {
                    return 'invalid';
                }
                
            }
        } else {
            console.error("Validation failed for a reason other than invalid token:", error)
        }
    } 
};

module.exports = validateToken;