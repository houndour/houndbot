'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('champions', [{
      id: 1,
      name: 'Annie',
      title: 'The dark child',
      is_starter: true,
    }, {
      id: 2,
      name: 'Olaf',
      title: 'The berserker',
      is_starter: true,
    }, {
      id: 3,
      name: 'Galio',
      title: 'The colossus',
      is_starter: true,
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('champions', null, {});
  }
};
