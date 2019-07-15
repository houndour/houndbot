import Discord from 'discord.js';
import User from '../models/user';
import UserChampion from '../models/user-champion';
import Champion from '../models/champion';

export default {
  name: 'champions',
  description: 'List all champions acquired',
  async execute(message: Discord.Message, args: string[]) {
    let user = await User.findOne({
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
      message.reply('You have not started your journey yet. Start with the command: Start.');
      return;
    }

    if (!user.champions) {
      message.reply('You do not have any Champions yet.');
      return;
    }

    const menssage = new Discord.RichEmbed()
      .setTitle("Champions")
      .setColor("#0099ff");

    for (const c of user.champions) {
      menssage.addField(c.champion.name, `Level: ${c.level}`)
    }

    message.channel.send(menssage);
  }
}
