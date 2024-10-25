const handleResub = require('../../eventHandlers/handleResub')

const resubTestHttp = async (req, res) => {

    const { user_id, user_name, broadcaster_user_id, broadcaster_user_name, tier, cumulative_months, message } = req.body.payload;

    const dummyPayload = {
        user_id,
        user_name,
        broadcaster_user_id,
        broadcaster_user_name,
        tier,
        cumulative_months,
        message
    };

    try {
        const response = await handleResub(dummyPayload);
        res.status(200).json(response);
    } catch (error) {
        console.error('Error triggering handleResub: ', error)
        res.status(500).json(error)
    }

    
};

module.exports = resubTestHttp;