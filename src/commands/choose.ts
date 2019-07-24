import Discord from 'discord.js';
import User from '../models/user';
import Champion from '../models/champion';
import UserChampion from '../models/user-champion';

export default {
  name: 'choose',
  description: 'Choose your first champion to start your journey',
  async execute(message: Discord.Message, args: string[]) {
    const championCount = await UserChampion.count({
      include: [{
        model: User,
        where: {
          discordId: message.author.id,
        },
      }],
    });

    if (championCount > 0) {
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

    const userChampion: any = {
      championId: champion.id,
      level: 1,
      experience: 0,
      health: champion.health,
      maxHealth: champion.health,
      selected: true,
    };

    const user = await User.findOne({ where: { discordId: message.author.id } });
    if (user) {
      userChampion.userId = user.id;
      UserChampion.create(userChampion);
    }
    else {
      User.create({
        discordId: message.author.id, champions: [userChampion]
      }, {
          include: [
            UserChampion,
          ]
        });
    }

    const embedMessage = new Discord.RichEmbed();
    embedMessage.setColor('#0099ff');
    embedMessage.setThumbnail(message.author.displayAvatarURL);
    embedMessage.addField(champion.name, champion.title, true);
    embedMessage.addField('Level', userChampion.level, true);
    embedMessage.addField('Experience', `${userChampion.experience}/${userChampion.level * 10}`, true);
    embedMessage.setImage(`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.name}_0.jpg`);

    await message.channel.send(embedMessage);
    message.reply(`congratulations! You've chosen ${champion.name} as your starter champion.`);
  }
};
