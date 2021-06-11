require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const disbut = require("discord-buttons");
disbut(client);
const commandHandler = require("./events/handler");
//4292865271



client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", commandHandler);

client.login(process.env.TOKEN);
