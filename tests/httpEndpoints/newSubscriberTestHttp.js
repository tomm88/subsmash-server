const handleNewSubscriber = require('../../eventHandlers/handleNewSubscriber')

const newSubscriberTestHttp = async (req, res) => {

    const { user_id, user_name, broadcaster_user_id, broadcaster_user_name, tier, is_gift } = req.body.payload;

    const dummyPayload = {
        user_id,
        user_name,
        broadcaster_user_id,
        broadcaster_user_name,
        tier,
        is_gift
    };

    try {
        const response = await handleNewSubscriber(dummyPayload);
        res.status(200).json(response);
    } catch (error) {
        console.error('Error triggering handleNewSubscriber: ', error)
        res.status(500).json(error)
    }

    
};

module.exports = newSubscriberTestHttp;