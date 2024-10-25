'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('streamers', 'active_slideshow_layout', {
      type: Sequelize.INTEGER,
      references: {
        model: 'layouts',
        key: 'id'
      }
    });
    await queryInterface.addColumn('streamers', 'active_alerts_layouts', {
      type: Sequelize.JSON,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('streamers', 'active_slideshow_layout');
    await queryInterface.removeColumn('streamers', 'active_alerts_layouts');
  }
};
