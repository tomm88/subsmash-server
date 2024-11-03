const handleNewSubscriber = require('./handleNewSubscriber');
const handleGiftSub = require('./handleGiftSub');
const handleResub = require('./handleResub');
const handleSessionWelcome = require('./handleSessionWelcome');
const handleReconnectWelcomeMessage = require('./handleReconnectWelcomeMessage');
const handleFollow = require('./handleFollow');
const handleCheer = require('./handleCheer');
const handleRaid = require('./handleRaid');


//Function that receives a new event from Twitch's EventSub and routes it to the relevant function based on the message_type
const handleTwitchEvent = async (message, ws, streamer, subscriptionTypes, isReconnect) => {
    try {
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
                let notification;
                if(message.metadata.subscription_type === 'channel.subscribe'){
                    console.log("New subscriber:", message.payload.event);
                    notification = await handleNewSubscriber(message.payload.event);
                }
                if(message.metadata.subscription_type === 'channel.subscription.gift'){
                    console.log("New gift sub:", message.payload.event);
                    notification = await handleGiftSub(message.payload.event)
                }
                if(message.metadata.subscription_type === 'channel.subscription.message') {
                    console.log("New resubscribe message:", message.payload.event);
                    notification = await handleResub(message.payload.event)
                }
                if(message.metadata.subscription_type === 'channel.follow') {
                    console.log("New follower:", message.payload.event);
                    notification = await handleFollow(message.payload.event, streamer.streamerDatabaseId)
                }
                if(message.metadata.subscription_type === 'channel.cheer') {
                    console.log("New cheer:", message.payload.event);
                    notification = await handleCheer(message.payload.event, streamer.streamerDatabaseId)
                }
                if(message.metadata.subscription_type === 'channel.raid') {
                    console.log("New raid:", message.payload.event);
                    notification = await handleRaid(message.payload.event, streamer.streamerDatabaseId)
                }
                break;
        }
        return;
    } catch(error) {
        console.log("Error handling the Twitch event", error)
        return error
    }
};

module.exports = handleTwitchEvent;