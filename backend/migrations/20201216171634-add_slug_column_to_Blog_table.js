'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Blogs',
      'slug',
     Sequelize.STRING
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Blogs',
      'slug',
     Sequelize.STRING
    )
  }
};
