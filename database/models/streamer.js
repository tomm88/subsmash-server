module.exports = (sequelize, DataTypes) => {
    const Streamer = sequelize.define('Streamer', {
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
        slideshow_hash: {
            type: DataTypes.STRING
        },
        alerts_hash: {
            type: DataTypes.STRING
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            onUpdate: DataTypes.NOW
        },
        is_approved: {
            type: DataTypes.BOOLEAN
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        active_prompts: {
            type: DataTypes.JSON,
            defaultValue: [1]
        },
        active_slideshow_layout: {
            type: DataTypes.INTEGER,
            references: {
                model: 'layouts',
                key: 'id'
            }
        },
        active_alerts_layouts: {
            type: DataTypes.JSON,
            defaultValue: []
        }
    }, {
        tableName: 'streamers'
    });

    return Streamer;
};
