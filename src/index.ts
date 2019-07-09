import fs from 'fs';
import dotenv from 'dotenv';
import Discord from 'discord.js';
import logger from './utils/logger';
import databaseLoader from './database';

dotenv.config();
const client = new Discord.Client();

// Loading database
(async () => {
  await databaseLoader();
})();

// Loading commands
const commands: Discord.Collection<string, command> = new Discord.Collection();
const commandFiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(__dirname + `/commands/${file}`).default;
  commands.set(command.name, command);
}

client.on('message', async (message: Discord.Message) => {
  if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

  const args = message.content.slice(process.env.PREFIX.length + 1).split(/ +/);
  const command = args.shift().toLowerCase();

  if (!commands.has(command)) return;

  try {
    commands.get(command).execute(message, args);
  } catch (error) {
    logger('command', error, 'error');
    message.reply('houve um problema ao executar este comando.');
  }
});

client.on('ready', () => {
  logger('start', `Logged in as ${client.user.tag}!`, 'info');
});

client.login(process.env.BOT_TOKEN);
