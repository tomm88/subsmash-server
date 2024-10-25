const cron = require('node-cron');
const db = require('../database/models');
const validateToken = require('../controllers/twitchApiControllers/validateToken');
const { Sequelize, Op } = require('sequelize');

const validateTokensHourly = () => {
    cron.schedule('0 * * * *', async () => {
        console.log('Running hourly token validation...');
        try {
            const tokens = await db.StreamerToken.findAll();
            if (tokens.length < 1) {
                console.log("no tokens");
                return;
            }

            for (let tokenRecord of tokens) {
                const accessToken = tokenRecord.access_token;
                const refreshToken = tokenRecord.refresh_token;

                const session = await db.Session.findOne({
                    where: {
                        data: {
                            [Sequelize.Op.like]: `%${tokenRecord.access_token}%`
                        }
                    }
                });

                const isValid = await validateToken(accessToken, refreshToken);

                if (isValid === 'valid') {
                    console.log("The access token", accessToken, "for streamer", tokenRecord.streamer_id, "is valid");
                    continue;
                }

                if (isValid && isValid.accessToken && isValid.refreshToken) {
                    console.log("The access token", accessToken, "for streamer", tokenRecord.streamer_id, "was refreshed. Updating session...");

                    if (session) {
                        let sessionData = JSON.parse(session.data);
                        sessionData.accessToken = isValid.accessToken;
                        sessionData.refreshToken = isValid.refreshToken;
                        await session.update({ data: JSON.stringify(sessionData) });
                    }

                    await tokenRecord.update({
                        access_token: isValid.accessToken,
                        refresh_token: isValid.refreshToken
                    });

                    continue;
                }

                if (isValid === 'invalid') {
                    console.log("The access token", accessToken, "for streamer", tokenRecord.streamer_id, "was invalid and could not be refreshed. Destroying session...");
                    await tokenRecord.destroy();
                    if (session) {
                        await session.destroy();
                        
                    }
                }
            }
        
        } catch (error) {
            console.error("Error validating tokens", error)
        }
    });
};

module.exports = validateTokensHourly;