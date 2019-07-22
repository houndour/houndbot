import Discord from 'discord.js';
import { DuelHelper } from '../helpers/duel';

export default {
  name: 'accept',
  description: 'Accept a duel request',
  async execute(message: Discord.Message, args: string[]) {
    if (DuelHelper.isUserInDuel(message.author)) {
      message.reply('you can\'t accept a challenge while in a duel');
      return;
    }

    if (message.mentions.users.size < 1) {
      message.reply('you forgot to metion who you want to accept');
      return;
    }

    if (message.mentions.users.size > 1) {
      message.reply('you can only accept one duel');
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

    if (duel.hasStarted()) {
      message.reply('you already accepted the duel');
      return;
    }

    duel.addParticipant(message.author);
    message.channel.send(`${message.author} accepted ${target}'s duel.`);

    DuelHelper.sendDuelInstructions(message.author);
    DuelHelper.sendDuelInstructions(target);
  }
};
