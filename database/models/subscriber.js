module.exports = (sequelize, DataTypes) => {
    const Subscriber = sequelize.define('Subscriber', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        twitch_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        twitch_username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            onUpdate: DataTypes.NOW
        }
    }, {
        tableName: 'subscribers'
    });

    return Subscriber;
};
