// module.exports = (sequelize, DataTypes) => {
//     const TwitchWebsocket = sequelize.define('TwitchWebsocket', {
//         id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             primaryKey: true
//         },
//         session_id: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         connection_status: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         streamer_id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             references: {
//                 model: 'streamers',
//                 key: 'id',
//             },
//         },
//         createdAt: {
//             type: DataTypes.DATE,
//             defaultValue: DataTypes.NOW
//         },
//         updatedAt: {
//             type: DataTypes.DATE,
//             defaultValue: DataTypes.NOW,
//             onUpdate: DataTypes.NOW
//         }
//     }, {
//         tableName: 'twitch_websockets'
//     });

//     TwitchWebsocket.associate = (models) => {
//         TwitchWebsocket.belongsTo(models.Streamer, {
//             foreignKey: 'streamer_id',
//             onDelete: 'CASCADE',
//             onUpdate: 'CASCADE'
//         });
//     };

//     return TwitchWebsocket;
// };
