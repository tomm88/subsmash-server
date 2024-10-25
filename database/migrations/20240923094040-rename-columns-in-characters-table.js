'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('characters', 'image_path', 'file_name');
    await queryInterface.renameColumn('characters', 'character_desc', 'user_prompt');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('characters', 'file_name', 'image_path');
    await queryInterface.renameColumn('characters', 'user_prompt', 'character_desc');
  }
};
