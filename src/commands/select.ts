import Discord from 'discord.js';
import User from '../models/user';
import Champion from '../models/champion';
import UserChampion from '../models/user-champion';

export default {
  name: 'select',
  description: 'Select one of your champions to be used in fights',
  async execute(message: Discord.Message, args: string[]) {
    if (args.length < 1) {
      message.reply('you forgot the name of the champion');
      return;
    }

    const championName = args.join(' ');
    const userChampion = await UserChampion.findOne({
      include: [{
        model: User,
        where: {
          discordId: message.author.id,
        },
      }, {
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

    if (userChampion.selected) {
      message.reply(`${userChampion.champion.name} already is your selected champion`);
      return;
    }

    UserChampion.update({ selected: false }, { where: { userId: userChampion.user.id } });
    userChampion.selected = true;
    userChampion.save();

    message.reply(`${userChampion.champion.name} is your selected champion now.`);
  }
};
