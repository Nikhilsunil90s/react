'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Courses',
      'slug',
     Sequelize.STRING
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Courses',
      'slug',
     Sequelize.STRING
    )
  }
};
