const { Client, Intents, Collection, setActivity  } = require("discord.js");
const fs = require("fs");
const Discord = require('discord.js');
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
const config = require("./config.json");
client.config = config;
client.commands = new Collection();


// Imports events from events folder, dynamicly
const events = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of events) {
  const eventName = file.split(".")[0];
  const event = require(`./events/${file}`);
  client.on(eventName, event.bind(null, client));
}


const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const commandfile of commands) {
  const commandName = commandfile.split(".")[0];
  const command = require(`./commands/${commandfile}`);

  console.log(`🔧 | Loaded  ${commandName} | COMMAND`);
  client.commands.set(commandName, command);
}


client.login(config.token);
console.log('Bot is running!')
console.log('made by berryes(https://github.com/berryes/mogusbot)')

