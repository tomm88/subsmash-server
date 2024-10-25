module.exports = (sequelize, DataTypes) => {
    const Layout = sequelize.define('Layout', {
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
      },
      streamer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'streamers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      layout_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      layout_type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      layout_data: {
        type: DataTypes.JSON,
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
        tableName: 'layouts',
        timestamps: true
    });

    return Layout;
};
