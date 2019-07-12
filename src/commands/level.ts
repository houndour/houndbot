import Discord from 'discord.js';
import { SummonerApi } from '../api/summoner';

export default {
  name: 'level',
  description: 'Show info about summoner account',
  async execute(message: Discord.Message, args: string[]) {
    if (args.length < 1) {
      message.reply('faltou o nome do invocador.');
      return;
    }

    try {
      const name = args.join(' ');
      const summoner = await SummonerApi.getSummonerByName(name);
      const summonerLeague = await SummonerApi.getSummonerRank(summoner.id);

      let queue = 0;
      for (let i = 0; i < summonerLeague.length; i++) {
        if (summonerLeague[i].queueType == 'RANKED_SOLO_5x5') {
          queue = i;
          break;
        }
      }

      const menssage = new Discord.RichEmbed()
        .setColor("#0099ff")
        .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/9.13.1/img/profileicon/${summoner.profileIconId}.png`)
        .addField(`${summoner.name}`, `Level: ${summoner.summonerLevel}`, true)
        .addField('Rank', `${summonerLeague[queue].tier} ${summonerLeague[queue].rank} ${summonerLeague[queue].leaguePoints} PDL`);

      message.channel.send(menssage);
    }
    catch (err) {
      message.reply('não encontrei um summoner com este nome.');
    }
  }
};
