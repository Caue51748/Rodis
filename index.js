const express = require("express");
const app = express();
app.use(express.json());

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
