import moment from 'moment';
import Discord from 'discord.js';
import User from '../models/user';
import Champion from '../models/champion';
import UserChampion from '../models/user-champion';

export default {
  name: 'info',
  description: 'Show info about your champions',
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

    const embedMessage = new Discord.RichEmbed();
    embedMessage.setColor('#0099ff');
    embedMessage.setThumbnail(message.author.displayAvatarURL);
    embedMessage.addField(userChampion.champion.name, userChampion.champion.title, true);
    embedMessage.addField('Level', userChampion.level, true);
    embedMessage.addField('Experience', `${userChampion.experience}/${userChampion.level * 10}`, true);
    embedMessage.setImage(`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${userChampion.champion.name}_0.jpg`);
    embedMessage.setFooter(`Champion obtained ${moment(userChampion.createdAt).fromNow()}`);

    message.channel.send(embedMessage);
  }
};
