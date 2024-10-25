module.exports = (sequelize, DataTypes) => {
    const PromptData = sequelize.define('PromptData', {
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
      prompt_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      prompt_data: {
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
        tableName: 'prompt_data',
        timestamps: true
    });

    return PromptData;
};
