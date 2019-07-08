import dotenv from 'dotenv';
import Discord from 'discord.js';
import axios from 'axios';

dotenv.config();
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const prefix = "h!";
client.on('message', (msg: Discord.Message) => {
  if (msg.content.startsWith(prefix + "level")) {

    axios.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${msg.content.substr(7)}?api_key=${process.env.API_KEY}`)
      .then(function (response) {
        // handle success
        console.log(response.data.profileIconId);
        const menssage = new Discord.RichEmbed()
          .setColor("#0099ff")
          .setImage(`http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/${response.data.profileIconId}.png`)
          .addField(msg.content.substr(7), response.data.summonerLevel, true);

        msg.channel.send(menssage);
      })
  }
});

client.login(process.env.BOT_TOKEN);
