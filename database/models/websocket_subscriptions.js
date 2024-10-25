// module.exports = (sequelize, DataTypes) => {
//     const WebsocketSubscription = sequelize.define('WebsocketSubscription', {
//         websocket_subscription_id: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             primaryKey: true,
//         },
//         websocket_id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             references: {
//                 model: 'twitch_websockets',
//                 key: 'id'
//             },
//         },
//         subscription_type: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         client_type: {
//             type: DataTypes.STRING,
//             allowNull: false
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
//         tableName: 'websocket_subscriptions'
//     });

//     return WebsocketSubscription;
// };
