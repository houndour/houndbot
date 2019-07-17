import Discord from 'discord.js';
import activeDuels from '../pools/duel';
import { DuelHelper } from '../helpers/duel';

export default {
  name: 'forfeit',
  description: 'Forfeit a duel',
  async execute(message: Discord.Message, args: string[]) {
    if (!DuelHelper.isUserInDuel(message.author)) {
      message.reply('you are not in a duel');
      return;
    }

    const duel = DuelHelper.getDuelInstance(message.author);
    if (duel.participants.length < 2) {
      message.reply('the duel has not started yet');
      return;
    }

    activeDuels.splice(activeDuels.indexOf(duel), 1);
    message.channel.send(`${message.author} has forfeited the duel.`);
  }
};
