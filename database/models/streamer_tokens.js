module.exports = (sequelize, DataTypes) => {
    const StreamerToken = sequelize.define('StreamerToken', {
        streamer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'streamers',
                key: 'id'
            }
        },
        access_token: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        refresh_token: {
            type: DataTypes.TEXT,
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
        tableName: 'streamer_tokens'
    });

    return StreamerToken;
};
