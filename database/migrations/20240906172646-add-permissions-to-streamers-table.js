'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('streamers', 'is_approved', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });

    await queryInterface.addColumn('streamers', 'is_admin', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('streamers', 'is_approved');
    await queryInterface.removeColumn('streamers', 'is_admin');
  }
};
