const axios = require('axios');
const qs = require('qs')

const logout = async (client_id, token) => {
    try {
        await axios.post('https://id.twitch.tv/oauth2/revoke', qs.stringify({
                client_id,
                token
            }), 
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
        return 'token revoked'
    } catch (error) {
        console.error ("Error revoking token: ", error.response.data)
        return 'error revoking token'
    }
};

module.exports = logout;
