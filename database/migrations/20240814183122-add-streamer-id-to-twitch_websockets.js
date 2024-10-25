'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('twitch_websockets', 'streamer_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 3,
      references: {
        model: 'streamers',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('twitch_websockets', 'streamer_id');
  }
};
