import Discord from 'discord.js';
import User from '../models/user';
import Champion from '../models/champion';
import UserChampion from '../models/user-champion';

export default {
  name: 'choose',
  description: 'Choose your first champion to start your journey',
  async execute(message: Discord.Message, args: string[]) {
    let user = await User.findOne({ where: { discordId: message.author.id } });
    if (user) {
      message.reply('you\'ve already chosen a champion');
      return;
    }

    const championName = args.join(' ');
    const champion = await Champion.findOne({
      where: {
        isStarter: true,
        name: championName,
      },
    });

    if (!champion) {
      message.reply('that\'s not a starter champion');
      return;
    }

    user = await User.create({
      discordId: message.author.id, champions: [{
        championId: champion.id,
        level: 1,
        experience: 0,
      }]
    }, {
        include: [
          UserChampion,
        ]
      });

    message.reply(`congratulations! You've chosen ${champion.name} as your starter champion.`);
  }
};
