import Discord, { TextChannel } from 'discord.js';
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
    if (participant.selectedAbility) {
      message.reply('you already selected an ability, wait next turn');
      return;
    }

    const abilityName = args.join(' ');
    const ability = participant.userChampion.champion.abilities.find((a) => { return a.name == abilityName });
    if (!ability) {
      message.reply('your champion doesn\'t have this ability');
      return;
    }

    if (ability.cost > participant.userChampion.mana) {
      message.reply('you don\'t have enough mana for this ability');
      return;
    }

    const tempAbility = participant.abilities.find((ab) => { return ab == ability });
    if (tempAbility) {
      if (tempAbility.cooldown > 0) {
        message.reply('this ability is in cooldown');
        return;
      }
      tempAbility.cooldown = ability.cooldown;
    }
    else {
      participant.abilities.push(ability);
    }

    participant.selectedAbility = ability;
    message.channel.send(`${message.author} selected the ability: ${ability.name}`);

    duel.battle(<TextChannel>message.channel);
  }
};
