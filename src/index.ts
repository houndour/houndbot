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

    axios.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${msg.content.substr(7)}?api_key=RGAPI-70f05a8e-baeb-4a34-8fe7-840965235dc2`)
    .then(function (response) {
        // handle success
        console.log(response.data.summonerLevel);
        const menssage = new Discord.RichEmbed()
            .setColor("#0099ff")
            .setTitle("")
            .addField(msg.content.substr(7), response.data.summonerLevel, true);

            msg.channel.send(menssage);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
    });
  }
});

client.login(process.env.TOKEN);