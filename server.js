const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const bot = new TelegramBot("YOUR_TELEGRAM_BOT_TOKEN", { polling: false });

app.post("/submit", (req, res) => {
    const { uid } = req.body;
    bot.sendMessage("YOUR_TELEGRAM_CHAT_ID", `New Verification:\nUID: ${uid}`);
    res.json({ success: true });
});

app.listen(3000, () => console.log("Server running on port 3000"));
