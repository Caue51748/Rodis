const { Client, GatewayIntentBits } = require('discord.js');
const fetch = require('node-fetch');
const express = require('express');

const app = express();
app.use(express.json());

// API que o Roblox vai consultar
let lastMessage = { username: "", message: "" };

app.post("/discord", (req, res) => {
  const { username, message } = req.body;
  if (username && message) {
    lastMessage = { username, message };
    console.log(`[Discord] ${username}: ${message}`);
  }
  res.sendStatus(200);
});

app.get("/discord", (req, res) => {
  res.json(lastMessage);
});

// Porta obrigatória do Render
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

// ----- BOT DO DISCORD -----

// Pegando token do bot via variável de ambiente
const TOKEN = process.env.DISCORD_BOT_TOKEN;

// Criação do client do Discord
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent // precisa estar habilitado no portal do Discord
  ]
});

// Evento para capturar mensagens
client.on('messageCreate', async (message) => {
  if (message.author.bot) return; // ignora mensagens de outros bots
  try {
    // Atualiza a mensagem para a API que o Roblox vai ler
    lastMessage = { username: message.author.username, message: message.content };

    // Opcional: envia para outro endpoint se quiser
    await fetch(`https://${process.env.RENDER_APP_URL}/discord`, {
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

// Login do bot
client.login(TOKEN);
