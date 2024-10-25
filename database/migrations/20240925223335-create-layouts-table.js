'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('layouts', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      streamer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'streamers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      layout_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      layout_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      layout_data: {
        type: Sequelize.JSON,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      } 
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('layouts');
  }
};
