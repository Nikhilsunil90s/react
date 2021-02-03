'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Courses',
      'thumbnail',
     Sequelize.STRING
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Courses',
      'thumbnail',
     Sequelize.STRING
    )
  }
};
