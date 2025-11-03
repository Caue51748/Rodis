const { Client, GatewayIntentBits } = require('discord.js');
const fetch = require('node-fetch');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// URL da sua API no Render
const API_URL = "https://rodis-5k4r.onrender.com/discord";

// Pegando o token do bot a partir da variável de ambiente
const TOKEN = process.env.DISCORD_BOT_TOKEN;

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



