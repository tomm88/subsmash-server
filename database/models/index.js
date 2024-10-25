const { Sequelize } = require('sequelize');
const config = require('../../config/sequelizeConfig');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const Streamer = require('./streamer')(sequelize, Sequelize.DataTypes);
const Subscriber = require('./subscriber')(sequelize, Sequelize.DataTypes);
const Character = require('./character')(sequelize, Sequelize.DataTypes);
const StreamerSubscriber = require('./streamer_subscriber')(sequelize, Sequelize.DataTypes);
const StreamerToken = require('./streamer_tokens')(sequelize, Sequelize.DataTypes);
const Session = require('./session')(sequelize, Sequelize.DataTypes);
const PromptData = require('./prompt_data')(sequelize, Sequelize.DataTypes);
const Layout = require('./layout')(sequelize, Sequelize.DataTypes);

Streamer.hasMany(StreamerSubscriber, { foreignKey: 'streamer_id' });
Subscriber.hasMany(StreamerSubscriber, { foreignKey: 'subscriber_id' });
Character.hasMany(StreamerSubscriber, { foreignKey: 'character_id' });

StreamerSubscriber.belongsTo(Streamer, { foreignKey: 'streamer_id' });
StreamerSubscriber.belongsTo(Subscriber, { foreignKey: 'subscriber_id' });
StreamerSubscriber.belongsTo(Character, { foreignKey: 'character_id' });

Streamer.hasMany(StreamerToken, { foreignKey: 'streamer_id' });
StreamerToken.belongsTo(Streamer, { foreignKey: 'streamer_id' });

Streamer.hasMany(PromptData, { foreignKey: 'streamer_id' });
PromptData.belongsTo(Streamer, { foreignKey: 'streamer_id' });

Streamer.hasMany(Layout, { foreignKey: 'streamer_id' });
Layout.belongsTo(Streamer, { foreignKey: 'streamer_id' });


module.exports = {
    sequelize, 
    Streamer, 
    Subscriber, 
    Character, 
    StreamerSubscriber, 
    StreamerToken, 
    Session,
    PromptData,
    Layout
};