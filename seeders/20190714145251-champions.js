'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('champions', [{
      id: 1,
      name: 'annie',
      title: 'the dark child',
      is_starter: true,
    }, {
      id: 2,
      name: 'olaf',
      title: 'the berserker',
      is_starter: true,
    }, {
      id: 3,
      name: 'galio',
      title: 'the colossus',
      is_starter: true,
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('champions', null, {});
  }
};
