import Discord from 'discord.js';
import User from '../models/user';
import UserChampion from '../models/user-champion';
import { DuelHelper } from '../helpers/duel';
import { ActiveDuel } from '../pools/duel';

export default {
  name: 'duel',
  description: 'Starts a duel with another user',
  async execute(message: Discord.Message, args: string[]) {
    if (DuelHelper.isUserInDuel(message.author)) {
      message.reply('you already are in a duel, finish it first');
      return;
    }

    if (message.mentions.users.size < 1) {
      message.reply('you forgot to metion who you want to duel');
      return;
    }

    if (message.mentions.users.size > 1) {
      message.reply('you can only duel one person');
      return;
    }

    const target = message.mentions.users.first();
    if (message.author == target) {
      //message.reply('you can\'t duel yourself');
      //return;
    }

    if (DuelHelper.isUserInDuel(target)) {
      message.reply('this user is already dueling');
      return;
    }

    const userChampCount = await UserChampion.count({
      where: {
        selected: true,
      },
      include: [{
        model: User,
        where: {
          discordId: message.author.id,
        },
      }],
    });

    if (userChampCount < 1) {
      message.reply('you don\'t have a selected champion');
      return;
    }

    const targetChampCount = await UserChampion.count({
      include: [{
        model: User,
        where: {
          discordId: target.id,
        },
      }],
    });

    if (targetChampCount < 1) {
      message.reply('this user doesn\'t have champions');
      return;
    }

    new ActiveDuel(message.author, target);
    message.channel.send(`${message.author} challenged ${target} to a duel. (${process.env.PREFIX} [accept or refuse] ${message.author})`);
  }
};
