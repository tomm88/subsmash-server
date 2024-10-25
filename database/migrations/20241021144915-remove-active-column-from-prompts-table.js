'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('prompt_data', 'active')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('prompt_data', 'active', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    })
  }
};
