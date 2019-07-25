import Discord from 'discord.js';
import { DuelHelper } from '../helpers/duel';

export default {
  name: 'use',
  description: 'Use a skill in the duel',
  async execute(message: Discord.Message, args: string[]) {
    if (!DuelHelper.isUserInDuel(message.author)) {
      message.reply('you aren\'t in a duel');
      return;
    }

    if (args.length < 1) {
      message.reply('you forgot the name of the skill');
      return;
    }

    const duel = DuelHelper.getDuelInstance(message.author);
    if (!duel.hasStarted()) {
      message.reply('the duel has not started yet');
      return;
    }

    const participant = duel.participants.find((p) => { return p.user == message.author });
    if (participant.selectedAbilityId) {
      message.reply('you already selected an ability, wait next turn');
      return;
    }

    const abilityName = args.join(' ');
    const ability = participant.userChampion.champion.abilities.find((a) => { return a.name == abilityName });
    if (!ability) {
      message.reply('your champion doesn\'t have this ability');
      return;
    }

    participant.selectedAbilityId = ability.id;
    message.channel.send(`${message.author} selected the ability: ${ability.name}`);

    /**
     * TO DO:
     * 
     * After both users selected an ability, calculate the damages and reduce champions health,
     * if one of them died, declare winner, if both died, declare draw
     */
  }
};
