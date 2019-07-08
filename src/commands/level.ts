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
      const summonerResp = await SummonerApi.getSummonerByName(name);

      const leagueResp = await SummonerApi.getSummonerRank(summonerResp.data.id);
      let queue = 0;
      for (let i = 0; i < leagueResp.data.length; i++) {
        if (leagueResp.data[i].queueType == 'RANKED_SOLO_5x5') {
          queue = i;
          break;
        }
      }

      const menssage = new Discord.RichEmbed()
        .setColor("#0099ff")
        .setImage(`http://ddragon.leagueoflegends.com/cdn/9.2.1/img/profileicon/${summonerResp.data.profileIconId}.png`)
        .addField(`${summonerResp.data.name}`, `Level: ${summonerResp.data.summonerLevel}`, true)
        .addField('Rank', `${leagueResp.data[queue].tier} ${leagueResp.data[queue].rank} ${leagueResp.data[queue].leaguePoints} PDL`);

      message.channel.send(menssage);
    }
    catch (err) {
      message.reply('não encontrei um summoner com este nome.');
    }
  }
};
