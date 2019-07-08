import dotenv from 'dotenv';
import Discord from 'discord.js';
import { SummonerApi } from './api/summoner';

dotenv.config();
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const prefix = "h!";
client.on('message', async (msg: Discord.Message) => {
  if (msg.content.startsWith(prefix + "level")) {
    try {
      const summonerResp = await SummonerApi.getSummonerByName(msg.content.substr(7));

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

      msg.channel.send(menssage);
    }
    catch (err) {
      msg.reply('não encontrei um summoner com este nome.');
    }
  }
});

client.login(process.env.BOT_TOKEN);
