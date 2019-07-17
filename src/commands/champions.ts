import Discord from 'discord.js';
import User from '../models/user';
import UserChampion from '../models/user-champion';
import Champion from '../models/champion';

export default {
  name: 'champions',
  description: 'List all champions acquired',
  async execute(message: Discord.Message, args: string[]) {
    const user = await User.findOne({
      where: {
        discordId: message.author.id,
      },
      include: [{
        model: UserChampion,
        include: [{
          model: Champion,
        }],
      }],
    });

    if (!user) {
      message.reply(`you have not started your journey yet. use: ${process.env.PREFIX} start`);
      return;
    }

    if (!user.champions.length) {
      message.reply('you do not have any champions yet');
      return;
    }

    const embedMessage = new Discord.RichEmbed().setTitle('Champions').setColor('#0099ff');
    embedMessage.setThumbnail(message.author.displayAvatarURL);

    for (const c of user.champions) {
      embedMessage.addField(`${c.champion.name} - ${c.champion.title}`, `Level: ${c.level}`);
    }

    message.channel.send(embedMessage);
  }
}
