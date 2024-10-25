const db = require('../models');

const updateUserPermissions = async (twitchUsername, isApproved, isAdmin) => {
    try {
        await db.Streamer.update({
            is_approved: isApproved,
            is_admin: isAdmin
        }, {
            where: {
                twitch_username: twitchUsername
            }
        });
        return 'updated'
    } catch (error) {
        console.error('Error updating user permissions', error);
        return;
    }
}

module.exports = updateUserPermissions;