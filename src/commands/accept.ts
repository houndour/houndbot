import Discord from 'discord.js';
import { DuelHelper } from '../helpers/duel';
import UserChampion from '../models/user-champion';
import User from '../models/user';
import Champion from '../models/champion';
import ChampionAbility from '../models/champion-ability';

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

    const userChampion = await UserChampion.findOne({
      where: {
        selected: true,
      },
      include: [{
        model: User,
        where: {
          discordId: message.author.id,
        },
      }, {
        model: Champion,
        include: [ChampionAbility]
      }],
    });

    if (!userChampion) {
      message.reply('you don\'t have a selected champion');
      return;
    }

    userChampion.health = userChampion.maxHealth;
    userChampion.mana = 50;

    duel.addParticipant({ user: message.author, userChampion, abilities: [] });
    message.channel.send(`${message.author} accepted ${target}'s duel.`);

    DuelHelper.sendDuelInstructions(message.author);
    DuelHelper.sendDuelInstructions(target);
  }
};
