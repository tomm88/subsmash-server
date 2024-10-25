'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.dropTable('websocket_subscriptions');
    await queryInterface.dropTable('twitch_websockets');
    
  },

  async down (queryInterface, Sequelize) {
    //nah
  }
};
