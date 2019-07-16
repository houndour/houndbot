import Discord from 'discord.js';
import User from '../models/user';
import Champion from '../models/champion';
import UserChampion from '../models/user-champion';

export default {
  name: 'release',
  description: 'Release one of your champions',
  async execute(message: Discord.Message, args: string[]) {
    if (args.length < 1) {
      message.reply('you forgot the name of the champion');
      return;
    }

    const championName = args.join(' ');
    const user = await User.findOne({
      where: {
        discordId: message.author.id,
      },
      include: [{
        model: UserChampion,
        include: [{
          model: Champion,
          where: {
            name: championName,
          },
        }],
      }],
    });

    if (!user) {
      message.reply('you don\'t have this champion');
      return;
    }

    const userChampion = user.champions.find((c) => { return c.champion.name == championName });
    userChampion.destroy();

    const embedMessage = new Discord.RichEmbed({ title: `You released ${userChampion.champion.name} ${userChampion.champion.title}` });
    embedMessage.setColor('#0099ff');
    embedMessage.setThumbnail(`http://ddragon.leagueoflegends.com/cdn/9.13.1/img/champion/${userChampion.champion.name}.png`);
    embedMessage.addField('Level', userChampion.level, true);
    embedMessage.addField('Experience', `${userChampion.experience}/${userChampion.level * 10}`, true);

    message.channel.send(embedMessage)
  }
};
