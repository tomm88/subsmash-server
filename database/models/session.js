module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define('Session', {
        sid: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        expires: {
            type: DataTypes.DATE,
        },
        data: {
            type: DataTypes.TEXT,
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
        tableName: 'Sessions'
    });

    return Session;
};
