const config = require('../config/config');

const handleLogoutHttp = async (req, res) => {

    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Could not log out');
        }

        res.clearCookie('connect.sid');

        res.status(200).json({redirectUrl: config.FRONTEND_URL});
    })

    
};

module.exports = handleLogoutHttp;