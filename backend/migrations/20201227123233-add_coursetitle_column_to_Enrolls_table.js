'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Enrolls',
      'course_title',
    Sequelize.STRING
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Enrolls',
      'course_title',
    Sequelize.STRING
    )
  }
};