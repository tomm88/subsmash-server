module.exports = (sequelize, DataTypes) => {
    const StreamerSubscriber = sequelize.define('StreamerSubscriber', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        streamer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'streamers',
                key: 'id'
            },
            primaryKey: true
        },
        subscriber_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'subscribers',
                key: 'id'
            },
            primaryKey: true
        },
        character_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'characters',
                key: 'id'
            },
        },
        subscription_tier: {
            type: DataTypes.STRING,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
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
        tableName: 'streamer_subscribers'
    });

    return StreamerSubscriber;
};
