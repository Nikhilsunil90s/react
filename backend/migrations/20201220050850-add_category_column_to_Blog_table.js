'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Blogs',
      'category',
     Sequelize.STRING
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Blogs',
      'category',
     Sequelize.STRING
    )
  }
};
