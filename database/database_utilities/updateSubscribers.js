const db = require('../models');
const getSubscribersFromDatabase = require('../database_utilities/getSubscribersFromDatabase');

//Updates subscibers for given streamer with latest subscriber info from Twitch
//Called when a component that displays current subscribers mounts (slideshow or dashboard subs table) after querying Twitch
async function updateDatabaseSubscribers(subs, streamerTwitchId, streamerDatabaseId, slideshowHash) {

    //Temporarily set "active" for all subscribers for current streamer to false - will be set to true again if detected in list from Twitch
    await db.StreamerSubscriber.update(
        { active: false },
        { where: { streamer_id: streamerDatabaseId } }
    )

    //Loops through the passed subscribers
    //If they have a subscription to the streamer in the database, sets "active" to true 
    //If not, creates the subscription record (will have no character)
    for (let sub of subs) {

        //Skip the subscriber if it is the streamer themselves
        if(sub.user_id === streamerTwitchId) continue;

        let [subscriber, subscriberCreated] = await db.Subscriber.findOrCreate({
            where: { twitch_id: sub.user_id },
            defaults: { twitch_username: sub.user_name}
        });

        let [streamerSubscriber, streamerSubscriberCreated] = await db.StreamerSubscriber.findOrCreate({
            where: { 
                streamer_id: streamerDatabaseId,
                subscriber_id: subscriber.id
            },
            defaults: {
                subscription_tier: sub.tier,
                active: true
            }
        });

        if(!streamerSubscriberCreated) {
            await streamerSubscriber.update({
                subscription_tier: sub.tier,
                active: true
            });
        }
    }

    //Queries the database for the now up-to-date list of subscribers for the current streamer
    //Formats them for sending to slideshow and dashboard table
    const formattedSubscribers = await getSubscribersFromDatabase(slideshowHash);

    return formattedSubscribers;
}

module.exports = updateDatabaseSubscribers;