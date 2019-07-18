import Discord from 'discord.js';
import { DuelHelper } from '../helpers/duel';

export default {
  name: 'refuse',
  description: 'Refuse a duel request',
  async execute(message: Discord.Message, args: string[]) {
    if (DuelHelper.isUserInDuel(message.author)) {
      message.reply('you already challenged someone');
      return;
    }

    if (message.mentions.users.size < 1) {
      message.reply('you forgot to metion who you want to refuse');
      return;
    }

    if (message.mentions.users.size > 1) {
      message.reply('you can only refuse one person');
      return;
    }

    const target = message.mentions.users.first();
    if (!DuelHelper.isUserInDuel(target)) {
      message.reply('this user did not challenge you');
      return;
    }

    const duel = DuelHelper.getDuelInstance(target);
    if (duel.challenged != message.author) {
      message.reply('this user did not challenge you');
      return;
    }

    if (duel.participants.length > 1) {
      message.reply('the duel has already started');
      return;
    }

    duel.destroy();
    message.channel.send(`${message.author} refused ${target}'s duel.`);
  }
};
