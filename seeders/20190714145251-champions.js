'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('champions', [{
      id: 1,
      name: 'Annie',
      title: 'The dark child',
      health: 524,
      health_per_level: 88,
      mana_regen: 25,
      is_starter: true,
    }, {
      id: 2,
      name: 'Olaf',
      title: 'The berserker',
      health: 597,
      health_per_level: 93,
      mana_regen: 20,
      is_starter: true,
    }, {
      id: 3,
      name: 'Galio',
      title: 'The colossus',
      health: 682,
      health_per_level: 112,
      mana_regen: 15,
      is_starter: true,
    }], {});

    await queryInterface.bulkInsert('champion_abilities', [
      // annie
      {
        champion_id: 1,
        name: 'Disintegrate',
        damage: 40,
        cooldown: 0,
        cost: 10,
      },
      {
        champion_id: 1,
        name: 'Incinerate',
        damage: 85,
        cooldown: 2,
        cost: 20,
      },
      {
        champion_id: 1,
        name: 'Summon: Tibbers',
        damage: 215,
        cooldown: 4,
        cost: 100,
      },
      // olaf
      {
        champion_id: 2,
        name: 'Undertow',
        damage: 60,
        cooldown: 1,
        cost: 10,
      },
      {
        champion_id: 2,
        name: 'Vicious Strikes',
        damage: 25,
        cooldown: 0,
        cost: 5,
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
        damage: 20,
        cooldown: 0,
        cost: 5,
      },
      {
        champion_id: 3,
        name: 'Justice Punch',
        damage: 30,
        cooldown: 2,
        cost: 10,
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
