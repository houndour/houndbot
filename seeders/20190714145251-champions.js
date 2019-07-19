'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('champions', [{
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

    await queryInterface.bulkInsert('champion_abilities', [
      // annie
      {
        champion_id: 1,
        name: 'Disintegrate',
        damage: 80,
        cooldown: 0,
        cost: 60,
      },
      {
        champion_id: 1,
        name: 'Incinerate',
        damage: 85,
        cooldown: 1,
        cost: 70,
      },
      {
        champion_id: 1,
        name: 'Summon: Tibbers',
        damage: 280,
        cooldown: 4,
        cost: 100,
      },
      // olaf
      {
        champion_id: 2,
        name: 'Undertow',
        damage: 75,
        cooldown: 0,
        cost: 70,
      },
      {
        champion_id: 2,
        name: 'Vicious Strikes',
        damage: 25,
        cooldown: 0,
        cost: 10,
      },
      {
        champion_id: 2,
        name: 'Reckless Swing',
        damage: 125,
        cooldown: 3,
        cost: 70,
      },
      // galio
      {
        champion_id: 3,
        name: 'Winds of War',
        damage: 90,
        cooldown: 0,
        cost: 85,
      },
      {
        champion_id: 3,
        name: 'Justice Punch',
        damage: 110,
        cooldown: 2,
        cost: 90,
      },
      {
        champion_id: 3,
        name: 'Hero\'s Entrance',
        damage: 200,
        cooldown: 5,
        cost: 100,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('champions', null, {});
    await queryInterface.bulkDelete('champion_abilities', null, {});
  }
};
