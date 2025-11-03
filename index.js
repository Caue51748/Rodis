const { Client, GatewayIntentBits } = require('discord.js');
const fetch = require('node-fetch');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent
  ]
});

const API_URL = "https://rodis-5k4r.onrender.com/discord"; // coloque sua URL do Render
const TOKEN = "MTQzNDgyMjcyMTkyMDk1ODU2Ng.GgCGqT.cftHhbTboU83ifOQ32iVyacHcv1nqN4HU9j59o"; // token do bot do Discord

client.on('messageCreate', async (message) => {
  if (message.author.bot) return; // ignora mensagens de outros bots
  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: message.author.username,
        message: message.content
      })
    });
    console.log(`[Discord] ${message.author.username}: ${message.content}`);
  } catch (err) {
    console.error(err);
  }
});

client.login(TOKEN);

