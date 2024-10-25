const updateUserPermissions = require('../database/database_utilities/updateUserPermissions');

const updateUserPermissionsHttp = async (req, res) => {
    const { twitchUsername, isApproved, isAdmin} = req.body;
    try {
        const response = await updateUserPermissions(twitchUsername, isApproved, isAdmin);
        res.status(200).json({response})
    } catch (error) {
        res.status(500).json({ message: 'Error updating user permissions', error})
    }
}

module.exports = updateUserPermissionsHttp;