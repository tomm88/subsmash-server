'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('streamers', 'active_prompt_presets', 'active_prompts')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('streamers', 'active_prompts', 'active_prompt_presets')
  }
};
