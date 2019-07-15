import Discord from 'discord.js';
import User from '../models/user';
import Champion from '../models/champion';
import UserChampion from '../models/user-champion';

export default {
  name: 'release',
  description: 'Release one of your champions',
  async execute(message: Discord.Message, args: string[]) {
    let user = await User.findOne({ where: { discordId: message.author.id } });
    if (!user) {
      message.reply('you don\'t have chosen a champion yet');
      return;
    }

    if (args.length < 1) {
      message.reply('you forgot the name of the champion');
      return;
    }

    const championName = args.join(' ');
    const userChampion = await UserChampion.findOne({
      include: [{
        model: Champion,
        where: {
          name: championName,
        },
      }],
    });

    if (!userChampion) {
      message.reply('you don\'t have this champion');
      return;
    }

    userChampion.destroy();
    message.reply(`you released ${userChampion.champion.name} (level: ${userChampion.level})`);
  }
};
