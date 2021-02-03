'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Blogs',
      'content',
      Sequelize.TEXT('long')
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Blogs',
      'content',
     Sequelize.STRING
    )
  }
};
