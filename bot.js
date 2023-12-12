const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");

// initialize env variables
require("dotenv").config();

const BOT_TOKEN = process.env.BOT_TOKEN;
// create a telegram bot app
const bot = new Telegraf(BOT_TOKEN);

// start command logic
bot.command(["start", "help"], (ctx) =>
  ctx.replyWithHTML(
    "Hello! I am <b>Echo Telegram bot</b> powered by Javlon Nomozov with telegraf module."
  )
);

// Eco bot
bot.on(message("text"), async (ctx) => {
  ctx.replyWithHTML(ctx.message.text);
});

bot.launch();
