import Discord from 'discord.js';
import Champion from '../models/champion';

export default {
  name: 'start',
  description: 'Information on how to begin to play',
  async execute(message: Discord.Message, args: string[]) {
    const embed = new Discord.RichEmbed().setColor("#0099ff");
    embed.title = `Hello ${message.author.username}`;
    embed.description = '**Welcome to the discord of legends**\n';
    embed.description += `To begin to play, choose a champion with **${process.env.PREFIX} choose {champion}**\n`;

    const champions = await Champion.findAll({ where: { is_starter: true } });
    for (const champion of champions) {
      embed.addField(champion.name, champion.title);
    }

    message.channel.send(embed);
  }
};
