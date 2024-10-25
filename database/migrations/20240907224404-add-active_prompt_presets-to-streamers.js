'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('streamers', 'active_prompt_presets', {
      type: Sequelize.JSON,
      defaultValue: [1]
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('streamers', 'active_prompt_presets');
  }
};
