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
      const response = await SummonerApi.getSummonerByName(msg.content.substr(7));
      const menssage = new Discord.RichEmbed()
        .setColor("#0099ff")
        .setImage(`http://ddragon.leagueoflegends.com/cdn/9.2.1/img/profileicon/${response.data.profileIconId}.png`)
        .addField(`Summoner: ${response.data.name}`, `Level: ${response.data.summonerLevel}`, true);

      msg.channel.send(menssage);
    }
    catch (err) {
      msg.reply('não encontrei um summoner com este nome.');
    }
  }
});

client.login(process.env.BOT_TOKEN);
