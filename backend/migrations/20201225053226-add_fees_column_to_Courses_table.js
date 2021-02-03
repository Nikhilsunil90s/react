'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Courses',
      'fees',
    Sequelize.DECIMAL(10, 2) 
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Courses',
      'fees',
    Sequelize.DECIMAL(10, 2) 
    )
  }
};