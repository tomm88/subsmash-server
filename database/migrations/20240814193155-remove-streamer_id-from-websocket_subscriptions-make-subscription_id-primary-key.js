'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('websocket_subscriptions', 'streamer_id');

    await queryInterface.changeColumn('websocket_subscriptions', 'websocket_subscription_id', {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('websocket_subscriptions', 'streamer_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue:3,
      references: {
        model: 'streamers',
        key: 'id'
      },
    });

    await queryInterface.removeConstraint('websocket_subscriptions', 'PRIMARY');

    await queryInterface.addConstraint('websocket_subscriptions', {
      fields: ['streamer_id', 'websocket_id'],
      type: 'primary key',
      name: 'PRIMARY',
    });
  }
};
