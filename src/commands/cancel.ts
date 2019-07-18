import Discord from 'discord.js';
import activeDuels from '../pools/duel';
import { DuelHelper } from '../helpers/duel';

export default {
  name: 'cancel',
  description: 'Cancel a duel request',
  async execute(message: Discord.Message, args: string[]) {
    if (!DuelHelper.isUserInDuel(message.author)) {
      message.reply('you did not challenge someone');
      return;
    }

    const duel = DuelHelper.getDuelInstance(message.author);
    if (duel.participants.length > 1) {
      message.reply('this duel already started');
      return;
    }

    activeDuels.splice(activeDuels.indexOf(duel), 1);
    message.channel.send(`${message.author} canceled the duel.`);
  }
};
