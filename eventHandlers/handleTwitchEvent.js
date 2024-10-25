const handleNewSubscriber = require('./handleNewSubscriber');
const handleGiftSub = require('./handleGiftSub');
const handleResub = require('./handleResub');
const handleSessionWelcome = require('./handleSessionWelcome');
const handleReconnectWelcomeMessage = require('./handleReconnectWelcomeMessage');
const handleFollow = require('./handleFollow') // FOR TESTING


//Function that receives a new event from Twitch's EventSub and routes it to the relevant function based on the message_type
const handleTwitchEvent = async (message, ws, streamer, subscriptionTypes, isReconnect) => {
    switch (message.metadata.message_type) {
        case 'session_welcome':
            ws.websocketSessionId = message.payload.session.id
            if(isReconnect) {
                await handleReconnectWelcomeMessage(streamer.streamerDatabaseId, message.payload.session.id, ws);
            } else {
                await handleSessionWelcome(streamer, message.payload.session.id, subscriptionTypes);
            }
        case 'session_keepalive':
            //console.log(`Received keepalive message for streamer ${streamer.streamerDatabaseId}`);
            break;
        case 'session_reconnect':
            const newTwitchWebsocketConnection = require('../websockets/twitchWebsocket/newTwitchWebsocketConnection')
            await newTwitchWebsocketConnection(streamer, subscriptionTypes, true, message.payload.session.reconnect_url);
            console.log("Received reconnect message. Reconnected successfully")
        case 'notification':
            if(message.metadata.subscription_type === 'channel.subscribe'){
            console.log("New subscriber:", message.payload.event);
            await handleNewSubscriber(message.payload.event);
            }
            if(message.metadata.subscription_type === 'channel.subscription.gift'){
                console.log("New gift sub:", message.payload.event);
                await handleGiftSub(message.payload.event)
            }
            if(message.metadata.subscription_type === 'channel.subscription.message') {
                console.log("New resubscribe message:", message.payload.event);
                await handleResub(message.payload.event)
            }
            //FOR TESTING
            if(message.metadata.subscription_type === 'channel.follow') {
                console.log("New follower:", message.payload.event);
                await handleFollow(message.payload.event, streamer.streamerDatabaseId)
            }
            break;
    }
};

module.exports = handleTwitchEvent;