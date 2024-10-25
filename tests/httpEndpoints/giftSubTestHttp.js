const handleGiftSub = require('../../eventHandlers/handleGiftSub')

const giftSubTestHttp = async (req, res) => {

    const { user_id, user_name, broadcaster_user_id, broadcaster_user_name, total, tier } = req.body.payload;

    const dummyPayload = {
        user_id,
        user_name,
        broadcaster_user_id,
        broadcaster_user_name,
        total,
        tier,
    };

    try {
        const response = await handleGiftSub(dummyPayload);
        res.status(200).json(response);
    } catch (error) {
        console.error('Error triggering handleGiftSub: ', error)
        res.status(500).json(error)
    }

    
};

module.exports = giftSubTestHttp;